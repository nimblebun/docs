import React from 'react';
import slugify from '@sindresorhus/slugify';

const flatten = (text, child) => {
  return typeof child === 'string'
    ? text + child
    : React.Children.toArray(child.props.children).reduce(flatten, text);
};

const HeadingRenderer = props => {
  const children = React.Children.toArray(props.children);
  const text = children.reduce(flatten, '');
  const slug = slugify(text);

  return React.createElement(`h${props.level}`, {id: slug}, props.children);
};

export default HeadingRenderer;
