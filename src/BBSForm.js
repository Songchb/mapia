import React, { Component } from 'react'
import request from 'superagent'

const styles = {
  form: {
    padding: 12,
    border: '1px solid silver',
    backgroundColor: '#F0F0F0'
  }
}

class BBSForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      body: ''
    }
  }

  nameChanged (e) {
    this.setState({ name: e.target.value })
  }

  bodyChanged (e) {
    this.setState({ body: e.target.value })
  }

  post (e) {
    request
      .get('/api/write')
      .query({
        name: this.state.name,
        body: this.state.body
      })
      .end((err, data) => {
        if (err) {
          console.error(err)
        }
        this.setState({ body: '' })
        console.log('this.props.onPost : ', this.props.onPost)
        if (this.props.onPost) {
          this.props.onPost()
        }
      })
  }

  render () {
    return (
      <div stype={styles.form}>
        이름: 
        <input
          style={{ leftMargin : '5px' }}
          type='text' value={this.state.name}
          onChange={e => this.nameChanged(e)}
        /><br />
        본문: 
        <input
          style={{ leftMargin : '5px' }}
          type='text' value={this.state.body} size='60'
          onChange={e => this.bodyChanged(e)}
        /><br />
        <button onClick={e => this.post()}>전송</button>
      </div>
    )
  }
}

export default BBSForm
