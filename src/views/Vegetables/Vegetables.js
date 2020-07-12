import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import axios from 'axios';
import moment from 'moment';
import ImageUploader from '../Widgets/ImageUploader.js';

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
      <td><Link to={vegetableLink} component={() => <ImageUploader updateVegetables={props.updateVegetables} params={`${vegetable._id}`}  /> }><Badge color={'primary'}>Upload Image</Badge></Link></td>
      <td>
        { vegetable.image_url !== '' ?
        <img src={vegetable.image_url} alt={vegetable.name} width="120px" height="120px"/>
            :
          <span>No Image</span>
        }
      </td>
    </tr>
  )
}

class Vegetables extends Component {
  constructor(props) {
    super(props)
    this.state = {
      vegetables: [],
      imageUpdated: false
    }

  }

  getVegetablesList = () => {
    axios({
      method: 'get',
      url: 'http://localhost:5000/app/api/vegetables/'
    })
      .then(res => {
				this.setState({vegetables: res.data.data})
      }).catch (error =>{
        console.log(error);
      })
  }

  updateVegetables = () => {
    this.setState({imageUpdated: true}, this.getVegetablesList());
  }

  componentDidMount = () => {
    this.getVegetablesList();
  }

  render() {
    const vegetableList = this.state.vegetables.slice(0,20)

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
                      <th scope="col">Image Upload</th>
                      <th scope="col">Image</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vegetableList.map((vegetable, index) =>
                    <VegetableRow updateVegetables={this.updateVegetables} key={index} vegetable={vegetable}/>
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
