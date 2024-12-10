
import { ObjectId} from "mongodb";
import mongoose from "mongoose";
import orderModel from "./order.model.js";
import cartItemModel from "../cartitems/cartItems.model.js";
import productModel from "../product/product.model.js";
export default class OrderController{
    
    async placeOrder(req, res, next){
        const session = await mongoose.startSession();
        const userId=req.body.userID;
    try {
        session.startTransaction();

         // 1. Get cartitems and calculate total amount.
         const items = await getTotalAmount(userId, session);
         const totalAmount = items.reduce((acc, item)=>acc+item.totalAmount, 0)
         console.log(totalAmount);

        // 3. Create an order
        const order=new orderModel({userID: new ObjectId(userId), totalAmount, timestamp: new Date() });
        await order.save({ session });

        // 4. Update stock and clear cart
        for (const item of items) {
            const product=await productModel.find({_id:new ObjectId(item.productID)}).session(session);
            if (!product || product.instock < item.quantity) {
                throw new Error(`Insufficient stock for product ${item.productID}`);
            }
            await productModel.updateOne(
                {_id: new ObjectId(item.productID)},
                {$inc:{instock: -item.quantity}},{session}
            )
        }

        await cartItemModel.deleteMany({ userID: new ObjectId(userId) }).session(session);

        // Commit the transaction
        await session.commitTransaction();
        console.log("Order placed successfully");
        res.status(200).send("Order placed successfully");
    } catch (error) {
        // Rollback the transaction in case of an error
        await session.abortTransaction();
        console.error("Transaction failed, changes rolled back:", error);
        throw error;
    } finally {
        // End the session
        session.endSession();
    }

    }
}

  async function  getTotalAmount(userId, session){
    const items = await cartItemModel.aggregate([
        // 1. Match cart items for the user
        {
            $match: { userID: new ObjectId(userId) }
        },
        // 2. Lookup products collection
        {
            $lookup: {
                from: "products",
                localField: "productID",
                foreignField: "_id",
                as: "productInfo"
            }
        },
        // 3. Unwind productInfo array
        {
            $unwind: "$productInfo"
        },
        // 4. Calculate totalAmount for each cart item
        {
            $addFields: {
                totalAmount: {
                    $multiply: ["$productInfo.price", "$quantity"]
                }
            }
        }
    ]).session(session);
       

    console.log(items);
    return items;
}