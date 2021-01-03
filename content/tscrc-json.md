---
title: TSC Run Configuration JSON (.tscrc.json) Specification
icon: 'tscrc.png'
date: '02 January 2021'
editors:
  - József Sallai (Nimble Bun Works<https://nimblebun.works>)
  - Bryan Barreto (Nimble Bun Works<https://nimblebun.works>)
---

## Introduction

`.tscrc.json` (TSC run configuration) is a JSON configuration file that powers the TSC language server. It contains definitions for TSC [commands](#tsc-definition), [directions](#directions), [faces](#faces), [maps](#maps), [weapons](#weapons), [items](#items), [equipables](#equipables), [illustrations](#illustrations), [songs](#songs), [sound effects](#sfx), and [custom argument types](#custom).

A default `.tscrc.json` file is included in the [language server](https://github.com/nimblebun/tsc-language-server) and it's based on the original Cave Story game. By default, the language server will load values from the [built-in configuration](https://github.com/nimblebun/tsc-language-server/blob/master/config/.tscrc.json), but it's very possible to use custom overwrites and definitions. For example, you may add the definition of another (non-standard) command to the list of available commands or specify the face portraits that your game/mod uses.

## Structure

### setup

**(object, optional)**

The setup object contains settings/rules that allow you to customize the way the language server will interpret the TSC files.

**Properties:**

- [`maxMessageLineLength`](#setup-max-message-line-length)

### setup.maxMessageLineLength

**(object, optional)**

This object specifies the maximum length of a line in a message box. The contents of a message box is everything between `<MSG`, `<MS2`, or `<MS3`, and `<CLO`, `<END`, `<ESC`, `<EVE`, `<INI`, `<TRA`, or `<XX1`. A line ends after the first line break or a `<CLR`.

**Properties:**

- [`plain`](#setup-max-message-line-length-plain)
- [`portrait`](#setup-max-message-line-length-portrait)

### setup.maxMessageLineLength.plain

**(number, optional)**

This property defines the maximum length of a message line when the message box does not have a portrait. The value of this property in the default configuration is **35**.

### setup.maxMessageLineLength.portrait

**(number, optional)**

This property defines the maximum length of a message line when the message box is accompanied by a portrait. The value of this property in the default configuration is **28**.

### tsc

**(object, optional)**

The `tsc` object contains command definitions in the form of key-value pairs. Each key is a TSC command (for example, `<TRA`) and the value is a [`TSCDefinition`](#tsc-definition) object.

### TSCDefinition

**(object)**

A TSC definition contains information about a given TSC command, such as the name, format, documentation, and information about arguments. It is used by the language server to provide hover information and command validity diagnostics to the client.

#### TSCDefinition.label

**(string, required)**

The label is the name of the TSC command (e.g.: `<TRA`). It should always be 4 characters long, uppercase, and start with a `<` character.

#### TSCDefinition.detail

**(string, required)**

Contains the expansion of the TSC command's name (e.g.: `TRAnsport`). While not enforced, it is recommended that the letters that make the command's name are capitalized.

#### TSCDefinition.documentation

**(string, required)**

The description of the TSC command. Here you can specify what exactly the command does and what do the parameters mean.

**Example:** `Travel to map W, run event X, and move the PC to coordinates Y:Z.`

#### TSCDefinition.format

**(string, required)**

Specifies the usage format of the TSC command. The letters used in the format should correspond to the letters used in the definition's [`documentation`](#tsc-definition-documentation) field. The format should start with the command's label and should be followed by argument masks separated by a colon (in case the command has arguments). Each argument mask should be an uppercase letter repeated four times.

**Example:** `<TRAWWWW:XXXX:YYYY:ZZZZ`

#### TSCDefinition.insertText

**(string, optional)**

An [LSP-compatible insert text](https://microsoft.github.io/language-server-protocol/specifications/specification-current/#textDocument_completion) to be used for automatic command completion. IDEs that are compatible with the language server protocol will use this template as a snippet to insert into the document.

The insert text should start with the command's name (**without** the leading `<` character). In case the command also has arguments, each argument should be listed in the following format: `${index:0000}`, where `index` specifies the index of the argument in the list (indexing starts at 1) and `0000` is an arbitrary value.

This property is optional. If missing, the language server will generate an insert text automatically from the [`argtype`](#tsc-definition-argtype) property (the arbitrary value mentioned above will be `0000`).

**Example:** `TRA${1:0000}:${2:0000}:${3:0000}:${4:0000}`

#### TSCDefinition.argtype

**(array of strings, optional)**

This array specifies the type of each argument of a TSC command. When not provided (or empty), the command does not have any arguments. The language server will provide argument-related information based on this array. An argument type must be a valid TSCRC definition type or a custom type. If an invalid type is provided, it will be interpreted as a generic `number` type.

If an argument is an event ID, its argument type should be `event`. This type works the same way as the `number` type, which automatically means explicit definitions of event descriptions cannot be created in the run configuration. The special type gets utilized by the language server in tandem with event symbols.

**Generic argument types:**

- number
- event
- direction
- face
- map
- weapon
- item
- equipable
- illustration
- song
- sfx

**Custom argument types:** when a type name is preceded by `custom:` (with the trailing colon), the search will happen in an object from the TSCRC [`custom`](#custom) property. For example, if the type is `custom:physics`, the language server will search for values inside the `physics` map from the `custom` object.

### directions

**(map<string, string>, optional)**

A map (key-value pairs) containing direction names. For example, `0000` will correspond to "left". When an argument type is `direction`, the language server will retrieve the name of the given direction from this key-value pair.

### faces

**(array of strings, optional)**

An array of strings containing the name of each portrait from the game's portrait sheet (from left to right, top to bottom). Overwriting this property means that every portrait needs to be redefined.

### maps

**(map<string, string>, optional)**

A map (key-value pairs) containing map names. For example, `0001` will correspond to "Pens1 - Arthur's House". When an argument type is `map`, the language server will retrieve the name of the given map from this key-value pair.

### weapons

**(map<string, string>, optional)**

A map (key-value pairs) containing weapon names. For example, `0001` will correspond to "Snake". It works the same way as any other generic property type that has a map-like structure.

### items

**(map<string, string>, optional)**

A map (key-value pairs) containing item names. For example, `0001` will correspond to "Arthur's Key". It works the same way as any other generic property type that has a map-like structure.

### equipables

**(map<string, string>, optional)**

A map (key-value pairs) containing equipable item names. For example, `0001` will correspond to "Map System". It works the same way as any other generic property type that has a map-like structure.

### illustrations

**(map<string, string>, optional)**

A map (key-value pairs) containing illustration names/descriptions. For example, `0001` will correspond to "Riding Dragon". It works the same way as any other generic property type that has a map-like structure.

### songs

**(map<string, string>, optional)**

A map (key-value pairs) containing song names. For example, `0001` will correspond to "Mischievous Robot". It works the same way as any other generic property type that has a map-like structure.

### sfx

**(map<string, string>, optional)**

A map (key-value pairs) containing sound effect descriptions. For example, `0001` will correspond to "moving cursor". It works the same way as any other generic property type that has a map-like structure.

### custom:*

**(object, optional)**

An object containing custom types. The types will work similarly to generic map-like types. Each key in the object is the name of the type and the value is an object containing key-value pairs. To refer to a custom type, you have to use the `custom:typename` syntax, where "typename" is the key in the object.

## File Location

Usually, you'd want to create a `.tscrc.json` in the root directory of your project's workspace (the directory that you open in your IDE). When the language client sees this file, it will notify the language server to merge it with the default configuration (via a `tsc/setConfig` JSON-RPC call). When the file is deleted, the language server will get a notification to revert the standard config (`tsc/resetConfig`).

## Example File

The following is an example for a custom configuration. Please remember that comments are not supported in JSON and the comments in the following document are merely for demo purposes.

```json
{
  "setup": {
    "maxMessageLineLength": {
      "plain": 35,
      "portrait": 28
    }
  },

  "tsc": {
    "<MIM": {
      "label": "<MIM",
      "detail": "MImiga Mask",
      "documentation": "Give mimiga mask X to player.",
      "format": "<MIMXXXX",
      "argtype": [ "number" ]
    }
  },

  "directions": {
    "0000": "Left",
    "0001": "Up"
    /// ...
  },

  "faces": [
    "reset",
    "Sue",
    "Toroko"
    // ...
  ],

  "custom": {
    "physics": { // custom:physics
      "0000": "Max Walk Speed",
      // ...
    }
  }
}
```

## Conformance

As well as sections marked as non-normative, all authoring guidelines, examples, and notes in this specification are non-normative. Everything else in this specification is normative.

The keywords `MAY`, `MUST`, and `SHOULD` are to be interpreted as described in [RFC 2119](https://tools.ietf.org/html/rfc2119).

## Acknowledgments

The editors would like to thank Jazz Jackalope, S. P. Gardebiter, and Kapow for their TSC definition notes that were used as a base for the default `.tscrc.json` configuration. You can view the notes [on this link](https://www.cavestory.org/guides/tsc_r2.txt).
