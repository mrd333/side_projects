//Removed after the routing process

var USER_DATA = {
     name: "Charlie Storey",
     username: "charlie301",
     image: "https://cdn0.iconfinder.com/data/icons/profession-vol-1/32/programmer_coder_developer_encoder_engineer_computer_coding-128.png"
}


var Link = React.createClass({
     changeURL: function(){
               window.location.replace(this.props.href);
     },

     render: function(){
          return (
               <span style={{color: 'green', cursor: 'pointer'}}
               onClick={this.changeURL}>
                    {this.props.children}
               </span>
          )
     }
});

var ProfilePic = React.createClass({
     render: function(){
          return (
               <img src={this.props.image} style={{height:100,width:100}} />
          )
     }
});

var ProfileLink = React.createClass({
     render: function(){
          return(
               <div>
                    <Link href={"https://github.com/" + this.props.username}>
                    {this.props.username}
                    </Link>
               </div>
          )
     }
});

var ProfileName = React.createClass({
     render:function(){
          return(
               <div> {this.props.name} </div>
          )
     }
});

//This is where all the classes are pulled in to the main Av temp
var Avatar = React.createClass({
     render: function(){
          return(
               <div>
                    <ProfilePic image={this.props.user.image} />
                    <ProfileName name={this.props.user.name} />
                    <ProfileLink username={this.props.user.username} />
               </div>
          )
     }
});

//add the main class and pass object USER_DATA for children to access
ReactDOM.render(<Avatar user={USER_DATA}/>, document.getElementById('app'));
