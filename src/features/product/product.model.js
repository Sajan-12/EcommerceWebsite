 import UserModel from "../user/user.model.js";
 export default  class ProductModel{
    constructor(name, desc, price, imageUrl, category,instock, sizes){
      
        this.name=name;
        this.desc=desc;
        this.price=price;

        this.imageUrl=imageUrl;
        this.category=category;
        this.inStock=instock;
        this.sizes=sizes; 
    }
    
    /*static rateProduct(userID, productID, rating){
      // 1. Validate user and product
      const user = UserModel.getAll().find(
        (u) => u.id == userID
      );
      if(!user){
        return "User not found";
      }
  
      // Validate Product
      const product = products.find(
        (p) => p.id == productID);
        if(!product){
          return "Product not found";
        }
  
        // 2. Check if there are any ratings and if not then add ratings array.
        if(!product.ratings){
          product.ratings = [];
          product.ratings.push({
            userID:userID, 
            rating: rating
          });
        }
        else{
          // 3. Check if user rating is already available.
          const existingRatingIndex = product.rating.findIndex(
            (r) => r.userID == userID
          );
          if(existingRatingIndex >= 0){
            product.ratings[existingRatingIndex] = {
              userID:userID, 
              rating: rating,
            };
          }
          else{
            // 4. if no exisitng rating, then add new rating.
            product.ratings.push({
              userID:userID, 
              rating: rating
            });
          }
        }
    }

    static filtered(minPrice,maxPrice,catagory){
      const results=products.filter((product=>{ 
        return(
          (!minPrice||product.price>=minPrice)&&(!maxPrice||product.price<=maxPrice
          )&&(!catagory||product.category==catagory)
        )
      }))
      console.log(results);
      return results;
    }
    static get(id){
      const product=products.find(p=>p.id==id);
      return product;
    }
    static add(product){
      product.id=products.length+1;
      products.push(product);
      return product;
    }
    static GetAll(){
        return products;
    }*/

}
var products = [
    new ProductModel(
      1,
      'Product 1',
      'Description for Product 1',
      19.99,
      'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg',
      'Cateogory1'
    ),
    new ProductModel(
      2,
      'Product 2',
      'Description for Product 2',
      29.99,
      'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg',
      'Cateogory2',
      ['M', 'XL']
    ),
    new ProductModel(
      3,
      'Product 3',
      'Description for Product 3',
      39.99,
      'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg',
      'Cateogory3',
      ['M', 'XL','S']
    )];