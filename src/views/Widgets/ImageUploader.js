import React, { Component } from 'react';
import axios from 'axios';
import { Row, Col } from 'reactstrap';

class ImageUploader extends Component {
  state = {
    message:'',
    uploadStatus: ''
  };

  getImage = e => {
      const files = e.target.files;
      if (files && files.length > 0) {
        const file = files[0];
        this.setState({ file });
      }
  };

  updateImageUrl = (url) => {
    axios({
      method: 'PUT',
      url: `http://localhost:5000/app/api/vegetables/updateImageUrl`,
      data: {
        id: this.props.params,
        imageUrl: url
       }
    }).then(res => {
      if(res.status === 200) {
        this.setState({ uploadStatus: 'success' })
        this.setState({message: 'Upload Successful'})
        this.props.updateVegetables();
      } else {
        this.setState({message: 'Upload Failed'})
      }
    })
  }

  uploadFile = e => {
    e.preventDefault();
    const { file } = this.state;
    this.setState({uploadStatus: 'uploading'})
    const extensionType = file.name.split('.')[1]
    const contentType = `image/${extensionType}`;
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
      let imageUrl = res.data.data.imageUrl
      if (res.status === 200) {
        axios
          .put(res.data.data.getUrl, file, {
            headers: {
              'Content-Type': `${contentType}`
            }
          })
          .then(res => {
            if(res.status === 200) {
              this.updateImageUrl(imageUrl)
              this.setState({message:'Upload Successful'})
              this.setState({uploadStatus: 'Success'})
            } else {
              const err = "Sorry, something went wrong";
              throw err;
            }
          })
          .catch(err => {
            console.log(err);
            this.setState({message:'Sorry, something went wrong'})
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
            { this.state.uploadStatus === 'uploading' ?
            <div className="d-flex justify-content-center">
              <div className="spinner-grow text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div> :
            <div>
              <input
                id={this.props.params}
                type='file'
                accept='image/*'
                onChange={this.getImage}
              />
              <p>{this.state.message}</p>
              <form>
                <button id={this.props.params} onClick={this.uploadFile} className="btn btn-sm btn-brand btn-behance">
                  <span className="cil-cloud-upload">
                    Upload
                  </span>
                </button>
              </form>
            </div>
            }
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default ImageUploader;

