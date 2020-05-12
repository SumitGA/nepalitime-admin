import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import axios from 'axios';
import moment from 'moment';

// import vegetablesData from './VegetablesData'

const VegetableRow = (props) => {
  const vegetable = props.vegetable
  const vegetableLink = `/vegetables/${vegetable._id}`

  return (
    <tr key={vegetable._id}>
      <th scope="row"><Link to={vegetableLink}>{vegetable._id}</Link></th>
      <td><Link to={vegetableLink}>{vegetable.name}</Link></td>
      <td>{vegetable.min}</td>
      <td>{vegetable.max}</td>
      <td>{vegetable.unit}</td>
      <td>{vegetable.type}</td>
      <td>{moment(vegetable.date).format('LL')}</td>
      <td><Link onClick={() => uploadImage(vegetable)}><Badge color={'primary'}>Upload Image</Badge></Link></td>
    </tr>
  )
}

const uploadImage = (vegetable) => {

}

class Vegetables extends Component {
  state = {
    vegetables: []
  }

  componentDidMount = () => {
    axios({
      method: 'get',
      url: 'https://nepalitime.herokuapp.com/app/api/vegetables'
    })
      .then(res => {
				this.setState({vegetables: res.data.data})
      }).catch (error =>{
        console.log(error);
      })
  }

  render() {

    const vegetableList = this.state.vegetables.slice(0,10)
    return (
      <div className="animated fadeIn">
        { vegetableList.length > 0 ?
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Vegetables <small className="text-muted">Lists</small>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">Name</th>
                      <th scope="col">Min</th>
                      <th scope="col">Max</th>
                      <th scope="col">Unit</th>
                      <th scope="col">Type</th>
                      <th scope="col">Date</th>
                      <th scope="col">Image</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vegetableList.map((vegetable, index) =>
                      <VegetableRow key={index} vegetables={this.state.vegetables} vegetable={vegetable}/>
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>  :
        <div className="d-flex justify-content-center">
          <div className="spinner-grow text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
        }
      </div>
    )
  }
}

export default Vegetables;
