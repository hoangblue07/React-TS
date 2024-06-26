import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DispatchType, RootState } from '../../redux/configStore'
import ProductCard from '../../components/ProductCard/ProductCard'
import { ProductModel, getProductApi } from '../../redux/ProductReducer/productReducer'
type Props = {}

export default function Home({ }: Props) {

  const { arrProduct } = useSelector((state: RootState) => state.productReducer);
  const dispatch: DispatchType = useDispatch();
  const getAllProductApi = () => {
    //gọi api và đưa dữ liệu lên redux
    dispatch(getProductApi());  
  }
  useEffect(() => {
    getAllProductApi();
  }, []);

  return (
    <div className='container'>
      <h3>Product Feature</h3>
      <div className='row mb-2'>
        {arrProduct.map((prod: ProductModel, index) => {
          return <div className='col-4' key={index}>
            <ProductCard prod={prod} />
          </div>
        })}
      </div>
    </div>
  )

}