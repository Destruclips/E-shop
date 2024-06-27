import Container from "@/app/Components/Container";
import ProductDetails from "./ProductDetails";
import List from "./List";
import { products } from "@/utils/produts";
interface IPrams { 
    productId?: string;
}
const Product = ({ params } : {params : IPrams}) => {
    console.log('params' , params);
    const product = products.find((item) => item.id === params.productId)
    return (
      <div className="p-8">
        <Container>
          <ProductDetails product = { product }/>
          <div className="flex flex-col mt-20 gap-4">
          <div>Add ating</div>
          <List product={product} />
          </div>
        </Container>
      </div>
    )
  }
  
  export default Product