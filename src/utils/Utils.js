import React from "react";

export default class Utils extends React.Component {

  static kebabCase(string) {
    return string.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/\s+/g, '-').toLowerCase()
  }

}