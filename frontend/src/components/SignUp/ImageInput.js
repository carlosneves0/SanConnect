import React from 'react'

class ImageInput extends React.Component {
  onChange = event => {
    const imageFile = event.target.files[0]
    const fileReader = new FileReader()
    fileReader.readAsDataURL(imageFile)
    fileReader.onload = () => {
      const { setFieldValue, name } = this.props
      setFieldValue(name, fileReader.result)
    }
  }

  render() {
    const { name, setFieldValue, ...props } = this.props
    return (
      <span>
        <input
          name={name}
          type='text'
          style={{ display: 'none' }}
          ref={input => this.textInput = input}
        />
        <input
          {...props}
          name={`fake/${name}`}
          type='file'
          accept='image/*'
          multiple={false}
          onChange={this.onChange}
        />
      </span>
    )
  }
}

export default ImageInput
