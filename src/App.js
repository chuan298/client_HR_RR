import axios from 'axios';

import React, { Component } from 'react';

class App extends Component {

  state = {

    // Initially, no file is selected
    selectedFile: null,
    HR: "",
    RR: ""
  };

  // On file select (from the pop up)
  onFileChange = (event) => {

    // Update the state
    this.setState({ selectedFile: event.target.files[0] });

  };

  // On file upload (click the upload button)
  onFileUpload = (file) => {


    const formData = new FormData();
    formData.append('file',file)
    const config = {
        headers: {
            'content-type': 'multipart/form-data',
            'Access-Control-Allow-Origin': '*'
        }
    }
    return axios.post(process.env.REACT_APP_API_ENDPOINT, formData,config)
  };
  onFormSubmit = (e) => {
    e.preventDefault() // Stop form submit
    this.setState({HR:"", RR: ""})
    this.onFileUpload(this.state.selectedFile).then((response)=>{
      console.log(response.data);
      this.setState({HR:response.data.HR, RR: response.data.RR})
    })
  }
  // File content to be displayed after
  // file upload is complete
  
  render() {
    return (
      <div>
        <h1>
          Demo Heart rate and Respiration rate
            </h1>

        {/* <div>
          <input type="file" onChange={this.onFileChange} />
          <button onClick={this.onFileUpload}>
            Upload!
                </button>
        </div> */}
        <form onSubmit={this.onFormSubmit}>
          <h1> </h1>
          <input type="file" onChange={this.onFileChange} />
          <button type="submit">Upload</button>
        </form>
        {/* {this.fileData()} */}
        <div>
          <h2>Heart Rate: {this.state.HR}</h2>
          <h2>Respiration Rate: {this.state.RR}</h2>

        </div>
      </div>
    );
  }
}


export default App;