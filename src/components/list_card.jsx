import React from 'react'
import Assignments from './assignments'
import DropTarget from './drop_target'

export default class ListCard extends React.Component {
  constructor() {
    super()
    this.onDragStart   = this.onDragStart.bind(this)
    this.delete        = this.delete.bind(this)
    this.show          = this.show.bind(this)
  }

  onDragStart(event) {
    event.dataTransfer.setData("text", this.props.cardId)
  }

  card() {
    return this.props.store.findCard(this.props.cardId)
  }

  delete(event) {
    event.stopPropagation()

    this.props.store.dispatch({
      type: "DELETE_CARD", cardId: this.card().id
    })
  }

  show() {
    this.props.showModal(this.card())
  }

  isHighlighted() {
    if(this.props.highlightOptions && this.props.highlightOptions.cardId === this.props.cardId)
      return "ListCard highlighted"
    else
      return "ListCard"
  }

  render() {
    return (
      <div>
        <div
          className={ this.isHighlighted() }
          draggable="true"
          onDragStart={ this.onDragStart }
          onClick={ this.show } >
          <div className="ListCard__delete" onClick={ this.delete }>✕</div>
          <div className="ListCard__title"> { this.card().title } </div>
          <div style={{ clear: "both" }} />

          <Assignments cardId={ this.props.cardId } store={ this.props.store } />
          <div style={{ clear: "both" }} />
        </div>
      </div>
    )
  }
}
