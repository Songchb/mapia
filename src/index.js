import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import request from 'superagent'
import BBSForm from './BBSForm.js'

class BBSApp extends Component {
  constructor (props) {
    super(props)
    this.state = {
      items: []
    }
  }

  componentWillMount () {
    this.loadLogs()
  }

  loadLogs () {
    request
      .get('/api/getItems')
      .end((err, data) => {
        if (err) {
          console.error(err)
          return
        }
        this.setState({ items: data.body.logs })
      })
  }

  render () {
    // 게시판 글 생성
    const itemsHtml = this.state.items.map(e => (
      <li key={e._id}>{e.name} - {e.body}</li>
    ))
    return (
      <div>
        <h1 style={styles.h1}>게시판</h1>
        <BBSForm onPost={e => this.loadLogs()} />
        <p style={styles.right}>
          <button onClick={e => this.loadLogs()}>
            다시 불러오기
          </button>
        </p>
        <ul>{itemsHtml}</ul>
      </div>
    )
  }
}

const styles = {
  h1: {
    backgroundColor: 'blue',
    color: 'white',
    fontSize: 24,
    padding: 12
  },
  right: {
    textAlign: 'right'
  }
}

ReactDOM.render(
  <BBSApp />,
  document.getElementById('root')
)
