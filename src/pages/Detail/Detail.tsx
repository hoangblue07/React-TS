import React, { useEffect } from 'react'
import ProductCard from '../../components/ProductCard/ProductCard'
import { useDispatch, useSelector } from 'react-redux'
import { DispatchType, RootState } from '../../redux/configStore'
import { RelatedProduct, getProductDetailApi } from '../../redux/ProductReducer/productReducer'
import { useParams } from 'react-router-dom'

type Props = {}

export default function Detail({ }: Props) {
  const { productDetail } = useSelector((state: RootState) => state.productReducer);
  const dispatch:DispatchType = useDispatch();
  const params = useParams();
  const getProductById = () => {
    // b1: lấy params từ url
    const id: string | undefined =params.id;
    // b2 : dispatch thunk
    const actionThunk = getProductDetailApi(id as string);
    dispatch(actionThunk);
  }

  useEffect(() => {
    getProductById();
  }, [params.id])

  return (
    <div className='container'>
      <div className='row mt-4'>
        <div className='col-4'>
          <img src={productDetail?.image} alt='hinhanh' height={350} width={350} style={{ objectFit: 'cover' }} />
        </div>
        <div className='col-8'>
          <h3>{productDetail?.name}</h3>
          <p>{productDetail?.description}</p>
        </div>
      </div>
      <h3 className='my-4 text-center'>-Realate Product</h3>
      <div className='row'>
        {productDetail?.relatedProducts.map((prod: RelatedProduct, index) => {
          return <div className='col-4' key={index}>
            <ProductCard prod={prod} />
          </div>
        })}
      </div>
    </div>
  )
}