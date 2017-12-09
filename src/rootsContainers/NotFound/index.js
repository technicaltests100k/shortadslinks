import React, { Component } from 'react';
import type { Element } from 'react';

/**
 * <NotFound /> component.
 */
class NotFound extends Component<*, *> {
  /**
   * Renders the NotFound component.
   *
   * @return {JSX} - rendered NotFound page.
   */
  render(): Element<*> {
    return <h1>This is the NotFound component</h1>;
  }
}

export default NotFound;
