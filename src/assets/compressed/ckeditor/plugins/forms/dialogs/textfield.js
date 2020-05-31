/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
CKEDITOR.dialog.add( 'textfield', function( editor ) {

  var acceptedTypes = {email: 1, password: 1, search: 1, tel: 1, text: 1, url: 1};

  function autoCommit( data ) {
    var element = data.element;
    var value = this.getValue();

    value ? element.setAttribute( this.id, value ) : element.removeAttribute( this.id );
  }

  function autoSetup( element ) {
    var value = element.hasAttribute( this.id ) && element.getAttribute( this.id );
    this.setValue( value || '' );
  }

  function getSelectedIndex( combo ) {
    combo = getSelect( combo );
    return combo ? combo.$.selectedIndex : -1;
  }

  function removeAllOptions( combo ) {
    combo = getSelect( combo );
    while ( combo.getChild( 0 ) && combo.getChild( 0 ).remove() ) {

    }
  }

  function modifyOption( combo, index, title, value ) {
    combo = getSelect( combo );
    if ( index < 0 )
      return false;
    var child = combo.getChild( index );
    child.setText( title );
    child.setValue( value );
    return child;
  }

  function removeSelectedOptions( combo ) {
    combo = getSelect( combo );

    // Save the selected index
    var iSelectedIndex = getSelectedIndex( combo );

    // Remove all selected options.
    for ( var i = combo.getChildren().count() - 1; i >= 0; i-- ) {
      if ( combo.getChild( i ).$.selected )
        combo.getChild( i ).remove();
    }

    // Reset the selection based on the original selected index.
    setSelectedIndex( combo, iSelectedIndex );
  }

  function setSelectedIndex( combo, index ) {
    combo = getSelect( combo );
    if ( index < 0 )
      return null;
    var count = combo.getChildren().count();
    combo.$.selectedIndex = (index >= count) ? (count - 1) : index;
    return combo;
  }

  function addOption( combo, optionText, optionValue, documentObject ) {
    if ( optionText.length === 0 ) {
      return;
    }

    combo = getSelect( combo );
    var oOption;
    if ( documentObject )
      oOption = documentObject.createElement( 'OPTION' );
    else
      oOption = document.createElement( 'OPTION' );

    if ( combo && oOption && oOption.getName() == 'option' ) {
      combo.append( oOption );

      oOption.setText( optionText.length > 0 ? optionText : '' );
      oOption.setValue( optionValue );

    } else {
      return false;
    }

    return oOption;
  }

  function getOptions( combo ) {
    combo = getSelect( combo );
    return combo ? combo.getChildren() : false;
  }

  function getSelect( obj ) {
    if ( obj && obj.domId && obj.getInputElement().$ ) // Dialog element.
      return obj.getInputElement();
    else if ( obj && obj.$ )
      return obj;
    return false;
  }

  return {
    title: editor.lang.forms.textfield.title,
    minWidth: 350,
    minHeight: 350,
    getModel: function( editor ) {
      var element = editor.getSelection().getSelectedElement();

      if ( element && element.getName() == 'input' &&
        (acceptedTypes[element.getAttribute( 'type' )] || !element.getAttribute( 'type' )) ) {
        return element;
      }

      return null;
    },
    onShow: function() {
      var values = this.getContentElement( 'info', 'allValues' );
      removeAllOptions( values );


      var element = this.getModel( this.getParentEditor() );
      if ( element ) {
        this.setupContent( element );
      }
    },
    onOk: function() {
      var editor = this.getParentEditor(),
        element = this.getModel( editor ),
        isInsertMode = this.getMode( editor ) == CKEDITOR.dialog.CREATION_MODE;

      if ( isInsertMode ) {
        element = editor.document.createElement( 'input' );
        element.setAttribute( 'type', 'text' );
      }

      var data = {element: element};

      if ( isInsertMode ) {
        editor.insertElement( data.element );
      }

      this.commitContent( data );

      // Element might be replaced by commitment.
      if ( !isInsertMode )
        editor.getSelection().selectElement( data.element );
    },
    onLoad: function() {
      this.foreach( function( contentObj ) {
        if ( contentObj.getValue ) {
          if ( !contentObj.setup )
            contentObj.setup = autoSetup;
          if ( !contentObj.commit )
            contentObj.commit = autoCommit;
        }
      } );
    },
    contents: [ {
      id: 'info',
      label: editor.lang.forms.textfield.title,
      title: editor.lang.forms.textfield.title,
      elements: [ {
        type: 'hbox',
        widths: [ '50%', '50%' ],
        children: [ {
          id: '_cke_saved_name',
          type: 'text',
          label: editor.lang.forms.textfield.name,
          'default': '',
          accessKey: 'N',
          setup: function( element ) {
            this.setValue( element.data( 'cke-saved-name' ) || element.getAttribute( 'name' ) || '' );
          },
          commit: function( data ) {
            var element = data.element;

            if ( this.getValue() )
              element.data( 'cke-saved-name', this.getValue() );
            else {
              element.data( 'cke-saved-name', false );
              element.removeAttribute( 'name' );
            }
          }
        } ]
      }, {
        type: 'hbox',
        widths: [ '190px', '115px' ],
        children: [ {
          type: 'vbox',
          widths: [ '70%', '100%' ],
          children: [
            {
              id: 'value',
              type: 'text',
              label: editor.lang.forms.textfield.value,
              'default': '',
              accessKey: 'V',
              commit: function() {

              },
              setup: function() {

              },
              validate: function() {
                if ( this.getValue().indexOf( '|' ) >= 0 ) {
                  alert( 'Cannot contain \'|\' character');
                  return false;
                }
                return true;
              }
            },
            {
              type: 'select',
              id: 'allValues',
              label: '',
              title: '',
              size: 5,
              width: '100%',
              style: 'width:190px;height:175px',
              items: [],
              onChange: function() {
                var dialog = this.getDialog(),
                  valueField = dialog.getContentElement( 'info', 'value' );

                valueField.setValue( this.getValue() );
              },
              setup: function( element ) {
                var values = element.getAttribute( 'value' ).split( '|' );
                var dialog = this.getDialog();
                var _this = this;
                values.forEach( function( entry ) {
                  if ( entry.length > 0 ) {
                    addOption( _this, entry, entry, dialog.getParentEditor().document );
                  }
                } );
              },
              commit: function( data ) {
                var element = data.element;
                var optionsValues = getOptions( this );
                element.setAttribute( 'value', '' );

                for ( var i = 0; i < optionsValues.count(); i++ ) {
                  var currentValue = element.getAttribute( 'value' );
                  if ( currentValue == null || currentValue.length === 0 ) {
                    element.setAttribute( 'value', optionsValues.getItem( i ).getValue() );
                  } else {
                    element.setAttribute( 'value', currentValue + '|' + optionsValues.getItem( i ).getValue() );
                  }
                }
              }
            } ]
        },
          {
            type: 'vbox',
            padding: 5,
            children: [ {
              type: 'button',
              id: 'btnAdd',
              label: editor.lang.forms.select.btnAdd,
              title: editor.lang.forms.select.btnAdd,
              style: 'width:100%;',
              onClick: function() {
                //Add new option.
                var dialog = this.getDialog(),
                  optValue = dialog.getContentElement( 'info', 'value' ),
                  values = dialog.getContentElement( 'info', 'allValues' );
                if (!optValue.validate()) {
                  return;
                }

                addOption( values, optValue.getValue(), optValue.getValue(), dialog.getParentEditor().document );

                optValue.setValue( '' );
              }
            },
              {
                type: 'button',
                id: 'btnModify',
                label: editor.lang.forms.select.btnModify,
                title: editor.lang.forms.select.btnModify,
                style: 'width:100%;',
                onClick: function() {
                  //Modify selected option.
                  var dialog = this.getDialog(),
                    optValue = dialog.getContentElement( 'info', 'value' ),
                    allValues = dialog.getContentElement( 'info', 'allValues' ),
                    iIndex = getSelectedIndex( allValues );

                  if ( iIndex >= 0 ) {
                    modifyOption( allValues, iIndex, optValue.getValue(), optValue.getValue() );
                  }
                }
              },
              {
                type: 'button',
                id: 'btnDelete',
                style: 'width:100%;',
                label: editor.lang.forms.select.btnDelete,
                title: editor.lang.forms.select.btnDelete,
                onClick: function() {
                  // Delete option.
                  var dialog = this.getDialog(),
                    values = dialog.getContentElement( 'info', 'allValues' ),
                    optValue = dialog.getContentElement( 'info', 'value' );

                  removeSelectedOptions( values );

                  optValue.setValue( '' );
                }
              }
            ]
          }
        ]
      },
        {
          type: 'hbox',
          widths: [ '50%', '50%' ],
          children: [ {
            id: 'size',
            type: 'text',
            label: editor.lang.forms.textfield.charWidth,
            'default': '',
            accessKey: 'C',
            style: 'width:50px',
            validate: CKEDITOR.dialog.validate.integer( editor.lang.common.validateNumberFailed )
          },
            {
              id: 'maxLength',
              type: 'text',
              label: editor.lang.forms.textfield.maxChars,
              'default': '',
              accessKey: 'M',
              style: 'width:50px',
              validate: CKEDITOR.dialog.validate.integer( editor.lang.common.validateNumberFailed )
            } ],
          onLoad: function() {
            // Repaint the style for IE7 (https://dev.ckeditor.com/ticket/6068)
            if ( CKEDITOR.env.ie7Compat )
              this.getElement().setStyle( 'zoom', '100%' );
          }
        },
        {
          id: 'type',
          type: 'select',
          label: editor.lang.forms.textfield.type,
          'default': 'text',
          accessKey: 'M',
          items: [
            [ editor.lang.forms.textfield.typeEmail, 'email' ],
            [ editor.lang.forms.textfield.typePass, 'password' ],
            [ editor.lang.forms.textfield.typeSearch, 'search' ],
            [ editor.lang.forms.textfield.typeTel, 'tel' ],
            [ editor.lang.forms.textfield.typeText, 'text' ],
            [ editor.lang.forms.textfield.typeUrl, 'url' ]
          ],
          setup: function( element ) {
            this.setValue( element.getAttribute( 'type' ) );
          },
          commit: function( data ) {
            var element = data.element;

            if ( CKEDITOR.env.ie ) {
              var elementType = element.getAttribute( 'type' );
              var myType = this.getValue();

              if ( elementType != myType ) {
                var replace = CKEDITOR.dom.element.createFromHtml( '<input type="' + myType + '"></input>', editor.document );
                element.copyAttributes( replace, {type: 1} );
                replace.replace( element );
                data.element = replace;
              }
            } else {
              element.setAttribute( 'type', this.getValue() );
            }
          }
        },
        {
          id: 'required',
          type: 'checkbox',
          label: editor.lang.forms.textfield.required,
          'default': '',
          accessKey: 'Q',
          value: 'required',
          setup: CKEDITOR.plugins.forms._setupRequiredAttribute,
          commit: function( data ) {
            var element = data.element;
            if ( this.getValue() )
              element.setAttribute( 'required', 'required' );
            else
              element.removeAttribute( 'required' );
          }
        } ]
    }
    ]
  }
    ;
} );
