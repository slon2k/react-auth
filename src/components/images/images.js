import React from "react";
import * as api from '../../services/api-service';
import ImageForm from "../image-form";

export class Images extends React.Component {
  state = {
    loading: true,
    error: false,
    images: []
  }

  componentDidMount() {
    api.getImages()
      .then(data => {
        if (Array.isArray(data)) {
          this.setState({ loading: false, images: data });
        } else {
          this.setState({ loading: false, images: [data] });
        }
        console.log(data);
      })
      .catch(error => {
        console.log(error);
        this.setState({error: true})
      });
  }

  render() {
    console.log(this.state);
    if (this.state.error) {
      return <div>Unable to load images...</div>
    }

    if (this.state.loading) {
      return <div>Loading images...</div>
    };

    return (
      <div>
        <h3>Images</h3>

        <ImageForm/>
      </div>
    )
  }
}