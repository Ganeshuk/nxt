import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import {AiFillStar} from 'react-icons/ai'
import Header from '../ProductsHeader'

import './index.css'

class ProductItemDetails extends Component {
  state = {spinner: true, list: []}

  componentDidMount() {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.getitem(id)
  }

  getitem = async id => {
    const jwt = Cookies.get('jwt_token')
    const option = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
    const response = await fetch(`https://apis.ccbp.in/products/${id}`, option)
    const result = await response.json()
    this.setState({spinner: false, list: result})
    console.log(result)
  }

  getcontent = () => {
    const {list} = this.state
    console.log(typeof list)
    const origin = {
      imageUrl: list.image_url,
      title: list.title,
      style: list.style,
      available: list.availability,
      brand: list.brand,
      description: list.description,
      price: list.price,
      rating: list.rating,
      similar: list.similar_products,
    }

    return (
      <div>
        <Header />
        <div className="main-card">
          <img src={origin.imageUrl} alt={origin.brand} className="imgcard" />
          <div className="card">
            <h1 className="title">{origin.title}</h1>
            <p className="price">{`Rs ${origin.price}/-`}</p>
            <p className="p">
              {origin.rating} <AiFillStar />
            </p>
            <p className="dis">{origin.description}</p>
            <h1 className="avail">
              Available:<span>{origin.available}</span>
            </h1>
            <h1 className="avail">
              brand:<span>{origin.brand}</span>
            </h1>
            <hr />
          </div>
        </div>
      </div>
    )
  }

  render() {
    const {spinner} = this.state
    return (
      <div>
        {spinner ? <Loader type="Circles" height="100px" /> : this.getcontent()}
      </div>
    )
  }
}

export default ProductItemDetails
