export default class CartItemModel{
   constructor(userID,productID,quantity,id){
    this.productID = productID;
    this.userID = userID;
    this.quantity = quantity;
    this.id = id;
   }

   static add(userID,productID,quantity){
        const cartItem=new CartItemModel(userID,productID,quantity);
        cartItem.id=cartItems.length+1;
        cartItems.push(cartItem);
         return cartItem;
   }

   static get(userID){
      return cartItems.filter(
          (i)=> i.userID == userID
      );
  }

  static delete(cartItemId,userID){
      const  index=cartItems.findIndex(i=>i.id==cartItemId&&i.userID==userID);
      if(index==-1){
         return "item not found";
      }else{
      cartItems.splice(index,1);
   
      }
  }
   
}
var cartItems = [
   new CartItemModel(1,2,1,1),
   new CartItemModel(1,1,2,2),
];