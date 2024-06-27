'use client';

import Button from "@/app/Components/Button";
import ProductImg from "@/app/Components/Products/ProductImg";
import SetColor from "@/app/Components/Products/SetColor";
import SetQuantity from "@/app/Components/Products/SetQuantity";
import { useCart } from "@/hooks/useCart";
import { Rating } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { MdCheckCircle } from "react-icons/md";
import { useRouter } from 'next/navigation';


interface ProductDetailsProps {
    product: any;
}

export type CartProductType = {
    id: string,
    name: string,
    description: string,
    category: string,
    brand: string,
    selectedImg: selectedImgType,
    quantity: number,
    price: number
}

export type selectedImgType = {
    color: string,
    colorCode: string,
    image: string
}

const Horizontal = () => {
    return <hr className="w-[30%] my-2" />
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
    const {handleAddProductToCart , cartProducts} = useCart()
    const [isProductInCart, setIsProductInCart] = useState(false);
    const [CartProduct, setCartProduct] = useState<CartProductType>({
        id: product.id,
        name: product.name,
        description: product.description,
        category: product.category,
        brand: product.brand,
        selectedImg: { ...product.images[0] },
        quantity: 1,
        price: product.price
    });
    const router = useRouter();
    const handleColorSelect = useCallback((value: selectedImgType) => {
        setCartProduct((prev) => ({
            ...prev,
            selectedImg: value
        }));
    }, []);

    console.log(cartProducts);

    useEffect(() => {
        setIsProductInCart(false)

        if(cartProducts){
            const existingIndex = cartProducts.findIndex((item) => item.id === product.id)

            if(existingIndex > -1) {
                setIsProductInCart(true);
            }
        }
    } , [cartProducts])

    const productRating = product.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) / product.reviews.length;

    const handleQtyDecrease = useCallback(() => {
        setCartProduct((prev) => {
            if (prev.quantity === 1) {
                return prev;
            }
            return { ...prev, quantity: prev.quantity - 1 };
        });
    }, []);

    const handleQtyIncrease = useCallback(() => {
        setCartProduct((prev) => {
            if (prev.quantity === 99) {
                return prev;
            }
            return { ...prev, quantity: prev.quantity + 1 };
        });
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <ProductImg  cartProduct={CartProduct} product={product} handleColorSelect={handleColorSelect}/>
            <div className="flex flex-col gap-1 text-slate-500 text-sm">
                <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
                <div className="flex items-center gap-2">
                    <Rating value={productRating} readOnly />
                    <div>{product.reviews.length} reviews</div>
                </div>
                <Horizontal />
                <div className="text-justify">{product.description}</div>
                <Horizontal />
                <div>
                    <span className="font-semibold">CATEGORY:</span> {product.category}
                </div>
                <div>
                    <span className="font-semibold">BRAND:</span> {product.brand}
                </div>
                <div className={product.inStock ? "text-teal-400" : "text-rose-400"}>{product.inStock ? "In Stock" : "Out Of Stock"}</div>
                <Horizontal />
                {isProductInCart ? (
                    <>
                    <p className="mb-2 text-seal-500 flex items-center gap-1">
                        <MdCheckCircle className='text-seal-400'size={20}/>
                        <span>Product added to cart</span>
                    </p>
                    <div className="max-w-[300px]">
                        <Button label="View Cart"outline onClick={() => {
                            router.push('/cart');
                        }} />
                    </div>
                    </> 
                ) : ( 
                <>
                <div><SetColor cartProduct={CartProduct} images={product.images} handleColorSelect={handleColorSelect} /></div>
                <Horizontal />
                <div><SetQuantity cartProduct={CartProduct} handleQtyDecrease={handleQtyDecrease} handleQtyIncrease={handleQtyIncrease} /></div>
                <Horizontal />
                <div className="max-w-[300px]"><Button label="Add To Cart" onClick={() => handleAddProductToCart(CartProduct)}/></div>
                </>
                )}
            </div>
        </div>
    );
}

export default ProductDetails;
