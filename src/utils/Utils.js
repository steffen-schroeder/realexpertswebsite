import React from "react";

export default class Utils extends React.Component {

  static kebabCase(string) {
    return string.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/\s+/g, '-').toLowerCase()
  }

  static removeUmlaut(string) {
    string = string.replace(/ä/g, 'a');
    string = string.replace(/ö/g, 'o');
    string = string.replace(/ü/g, 'u');
    string = string.replace(/ß/g, 'ss');
    return string
  }

}