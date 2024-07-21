import React, { Component } from 'react';
import { Table } from '@finos/perspective';
import { ServerRespond } from './DataStreamer';
import './Graph.css';

/**
 * Props declaration for <Graph />
 */
interface IProps {
  data: ServerRespond[],
}

/**
 * Perspective library adds load to HTMLElement prototype.
 * This interface acts as a wrapper for Typescript compiler.
 */
interface PerspectiveViewerElement extends HTMLElement {
  load: (table: Table) => void,
}

/**
 * React component that renders Perspective based on data
 * parsed from its parent through data property.
 */
class Graph extends Component<IProps, {}> {
  private table: Table | undefined;

  render() {
    return <perspective-viewer></perspective-viewer>;
  }

  componentDidMount() {
    // Get element to attach the table from the DOM.
    const elem = document.querySelector('perspective-viewer') as PerspectiveViewerElement;

    const schema = {
      stock: 'string',
      top_ask_price: 'float',
      top_bid_price: 'float',
      timestamp: 'date',
    };

    if (window.perspective && window.perspective.worker()) {
      this.table = window.perspective.worker().table(schema);
    }
    if (this.table && elem) {
      // Load the `table` in the `<perspective-viewer>` DOM reference.

      // Add more Perspective configurations here.
      elem.load(this.table);
    }
  }

  componentDidUpdate() {
    // Everytime the data props is updated, insert the data into Perspective table
    if (this.table) {
      // As part of the task, you need to fix the way we update the data props to
      // avoid inserting duplicated entries into Perspective table again.
      const formattedData = this.props.data.map((el: ServerRespond) => ({
        stock: el.stock,
        top_ask_price: el.top_ask?.price || 0,
        top_bid_price: el.top_bid?.price || 0,
        timestamp: el.timestamp,
      }));

      // Update the table with new data
      this.table.update(formattedData);
    }
  }
}

export default Graph;