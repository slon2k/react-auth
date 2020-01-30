import React from "react"
import * as api from "../../services/api-service"

export class ImageForm extends React.Component {
  store = {
    file: null
  }

  render() {
    const handleSubmit = () => {
      api.createImage().then(() => this.setState({file: null}))
    };

    return (
      <div>
        <h3>Upload new image</h3>
        <form>
          <input type="file" name="image" onChange={(e) => this.setState({file: e.target.value})}/>
          <br/>
          <button onClick={handleSubmit}>Save</button>
        </form>
      </div>
    )
  }
}