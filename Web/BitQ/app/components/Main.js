/*
Very important as this ensures that any children specified
in the <Route> element are rendered.
*/

var React = require('react');

var Main = React.createClass({
     render: function(){
          return(
               <div className="container">
                    <div className="main-container">

                         {this.props.children}
                         </div>
               </div>

          )
     }
});

module.exports = Main;
