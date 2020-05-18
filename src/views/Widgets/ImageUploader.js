import React, { Component } from 'react';
import axios from 'axios';
import { Row, Col } from 'reactstrap';
import FormData from 'form-data';
var fs = require('fs');

class ImageUploader extends Component {
  state = {
      message:''
    };

  getImage = e => {
      const files = e.target.files;
      if (files && files.length > 0) {
        const file = files[0];
        this.setState({ file });
      }
    };

  uploadFile = e => {
    e.preventDefault();
    const { file } = this.state;
    this.setState({message:'Uploading...'})
    const contentType = file.type; // eg. image/jpeg or image/svg+xml
    const formData = new FormData();
    formData.append('filename', file.name);
    formData.append('uploadedFile', file);
    const generatePutUrl = 'http://localhost:5000/app/api/vegetables/imageUrl';
    const options = {
      params: {
        Key: file.name,
        ContentType: contentType
      },
      headers: {
        'Content-Type': contentType
      }
    };

    axios.get(generatePutUrl, options).then(res => {
      if (res.status === 200) {
      axios
        .put(`${res.data.data}`, file, options)
        .then(res => {
          console.log(res)
          this.setState({message:'Upload Successful'})
          setTimeout(()=>{
            this.setState({message:''});
            document.querySelector('#upload-image').value='';
            }, 2000)
          })
        .catch(err => {
          this.setState({message:'Sorry, something went wrong'})
          console.log('err', err);
        });
      } else {
        this.setState({message: 'Sorry, something went wrong'})
      }
      });
    };

  render() {
      return (
        <React.Fragment>
          <Row>
            <Col xl={12}>
              <input
                id='upload-image'
                type='file'
                accept='image/*'
                onChange={this.getImage}
              />
              <p>{this.state.message}</p>
              <form onSubmit={this.uploadFile}>
                <button className="btn btn-sm btn-brand btn-behance" id='file-upload-button'>
                  <span className="cil-cloud-upload">
                    Upload
                  </span>
                </button>
              </form>
            </Col>
          </Row>
        </React.Fragment>
        );
    }
}

export default ImageUploader;

