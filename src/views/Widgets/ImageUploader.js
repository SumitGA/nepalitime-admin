import React, { Component } from 'react';
import axios from 'axios';
import { Row, Col } from 'reactstrap';

class ImageUploader extends Component {
  state = {
    message:'',
    uploadStatus: '',
    progressValue: 0
  };

  getImage = e => {
      const files = e.target.files;
      if (files && files.length > 0) {
        const file = files[0];
        this.setState({ file });
      }
  };

  updateImageUrl = (url) => {
    this.setState({progressValue: 80})
    axios({
      method: 'PUT',
      url: `http://localhost:5000/app/api/vegetables/updateImageUrl`,
      data: {
        id: this.props.params,
        imageUrl: url
       }
    }).then(res => {
      if(res.status === 200) {
        this.setState({progressValue: 100})
        this.setState({ uploadStatus: 'success' })
        this.setState({message: 'Upload Successful'})
      } else {
        this.setState({message: 'Upload Failed'})
      }
    })
  }

  uploadFile = e => {
    this.setState({progressValue: 10})
    e.preventDefault();
    const { file } = this.state;
    this.setState({uploadStatus: 'uploading'})
    const extensionType = file.name.split('.')[1]
    const contentType = `image/${extensionType}`;
    const generatePutUrl = 'http://localhost:5000/app/api/vegetables/imageUrl';
    this.setState({progressValue: 20})
    const options = {
      params: {
        Key: file.name,
        ContentType: contentType
      },
      headers: {
        'Content-Type': contentType
      }
    };

    this.setState({progressValue: 50})
    axios.get(generatePutUrl, options).then(res => {
      let imageUrl = res.data.data.imageUrl
      if (res.status === 200) {
        axios
          .put(res.data.data.getUrl, file, {
            headers: {
              'Content-Type': contentType
            }
          })
          .then(res => {
            if(res.status === 200) {
              this.setState({progressValue: 70})
              this.updateImageUrl(imageUrl)
              this.setState({message:'Upload Successful'})
              this.setState({uploadStatus: 'Success'})
              this.props.updateVegetable();
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
              { this.state.uploadStatus !== 'uploading' ?
              <div>
                <input
                  id={this.props.params}
                  type='file'
                  accept='image/*'
                  onChange={this.getImage}
                />
                <p>{this.state.message}</p>
                <form onSubmit={this.uploadFile}>
                  <button id={this.props.params} className="btn btn-sm btn-brand btn-behance">
                    <span className="cil-cloud-upload">
                      Upload
                    </span>
                  </button>
                </form>
              </div>
                  :
              <div className="progress">
                <div className="progress-bar progress-bar-striped" role="progressbar" style={{width: "10%"}} aria-valuenow="10" aria-valuemin="0" aria-valuemax={this.state.progressValue}>Uploading</div>
              </div>
              }
            </Col>
          </Row>
        </React.Fragment>
        );
    }
}

export default ImageUploader;

