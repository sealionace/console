/** @jsx React.DOM */
var $main = $("#main");
var $app = $("#app");

var container = $main.get(0);

var apps = require("ace/apps");
var app = require("ace/app");
var internal = require("ace/internal");
var gui = require("nw.gui");

gui.Window.get().showDevTools();

var Tile = React.createClass({
    
    validateSize: function(size) {
        if (typeof size === "undefined")
            return "";
        
        size = $.trim(size).toLowerCase();
        if (size != "double" && size != "triple" && size != "quadro")
            return "";
        
        return size;
    },
    
    render: function() {
        if (this.props.app) {
            this.props.size = this.props.size || app.getSize(this.props.app);
            this.props.vertical = this.props.vertical || app.Orientation.Vertical == this.props.app.getOrientation();
            this.props["background-color"] = this.props["background-color"] || this.props.app.getBackgroundColor();
            if (this.props.app.getIcon() instanceof app.BackgroundImage) {
                this.props.image = this.props.image || this.props.app.getIcon().getImage();
            } else if (this.props.app.getIcon() instanceof app.BackgroundIcon) {
                this.props.icon = this.props.icon || this.props.app.getIcon().getIcon();
            }
        }

        var size = this.validateSize(this.props.size);
        var orientation = size ? this.props.vertical ? "-vertical" : "" : "";
        var bgColor = this.props["background-color"] ? "bg-" + $.trim(this.props["background-color"]) : "";
        
        var classes = "tile " + size + orientation + " " + bgColor;
        
        // imagem tem procedência sobre ícone
        var img = "";
        if (this.props.image) {
            img = <div className="tile-content image"><img src={this.props.image} /></div>;
        } else if (this.props.icon) {
            img = <div className="tile-content icon"><i className={"icon-" + this.props.icon}></i></div>;
        }
        
        var content = this.props.children || "";
        
        return <div onClick={this.execute} className={classes}>{img}{content}</div>;
    },
    
    execute: function() {
        var iframe = $("<iframe height='100%' width='100%' frameborder='no' />");
        internal.run(this.props.app, gui, iframe);
        $app.empty().append(iframe);
        
        iframe.on('load', function() {
            $main.toggleClass("invisible");
            $app.toggleClass("invisible");
        });
    }
    
});
/*
var MainMenu = React.createClass({
    
    render: function() {
        return (
        <div id="menu">
            <Tile size="double" image="images/all/Spelunky.jpg" />
            <Tile size="double" image="images/grid2.png" />
            <Tile background-color="blue" image="images/pinball.png" />
            <Tile background-color="darkPink" icon="cart-2">
                <div className="tile-status">
                    <span className="name">Store</span>
                </div>
            </Tile>
            <Tile image="images/Battlefield_4_Icon.png">
                <div className="brand bg-dark opacity">
                    <span className="text">
                        Battlefield 4, agora disponível!
                    </span>
                </div>
            </Tile>
            <Tile background-color="black" image="images/Crysis-2-icon.png" />
            <Tile background-color="black" image="images/Mario.png" />
            <Tile image="images/all/config.png" />
            <Tile size="double" image="images/all/journey.jpg" />
            <Tile background-color="darkRed" image="images/D3.png" />
            <Tile size="double" image="images/all/minecraft.jpg" />
            <Tile background-color="black" image="images/all/fp1.jpg" />
            <Tile size="double" image="images/b2.jpg">
                <div className="brand bg-dark opacity">
                    <span className="text">
                        Em breve, Ace para Windows!
                    </span>
                </div>
            </Tile>
        </div>
        );
    }
    
});*/

var Main = React.createClass({

    createTile: function(app) {
        return <Tile app={app} />;
    },

    renderTiles: function() {
        return this.props.apps.map(this.createTile);
    },

    render: function() {
        return (
            <div id="menu">
                {this.renderTiles()}
            </div>
        );
    }

});

React.renderComponent(<Main apps={apps()} />, container);