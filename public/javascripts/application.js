(function() {
    var labelType, useGradients, nativeTextSupport, animate;

    (function() {
        var ua = navigator.userAgent,
                iStuff = ua.match(/iPhone/i) || ua.match(/iPad/i),
                typeOfCanvas = typeof HTMLCanvasElement,
                nativeCanvasSupport = (typeOfCanvas == 'object' || typeOfCanvas == 'function'),
                textSupport = nativeCanvasSupport
                        && (typeof document.createElement('canvas').getContext('2d').fillText == 'function');
        //I'm setting this based on the fact that ExCanvas provides text support for IE
        //and that as of today iPhone/iPad current text support is lame
        labelType = (!nativeCanvasSupport || (textSupport && !iStuff)) ? 'Native' : 'HTML';
        nativeTextSupport = labelType == 'Native';
        useGradients = nativeCanvasSupport;
        animate = !(iStuff || !nativeCanvasSupport);
    })();

    $(function() {
        init();
    });

    var Log = {
        elem: false,
        write: function(text) {
            console.log(text);
        }
    };


    function init() {
        var st = new $jit.ST({
            //id of viz container element
            injectInto: 'infovis',
            orientation: 'top',
            //set duration for the animation
            duration: 800,
            //set animation transition type
            transition: $jit.Trans.Quart.easeInOut,
            //set distance between node and its children
            levelDistance: 50,
            //enable panning
            Navigation: {
                enable:true,
                panning:true
            },
            //set node and edge styles
            //set overridable=true for styling individual
            //nodes or edges
            Node: {
                autoHeight: true,
                autoWidth: true,
                type: 'rectangle',
                color: '#aaa',
                overridable: true
            },

            Edge: {
                type: 'bezier',
                overridable: true
            },

            onBeforeCompute: function(node) {
            },

            onAfterCompute: function() {
            },

            //This method is called on DOM label creation.
            //Use this method to add event handlers and styles to
            //your node.
            onCreateLabel: function(label, node) {
                label.id = node.id;
                label.innerHTML = node.name;
                label.onclick = function() {
                    st.onClick(node.id);
                };
                //set label styles
                var style = label.style;
                //style.width = 60 + 'px';
                //style.height = 17 + 'px';
                style.cursor = 'pointer';
                style.color = '#333';
                style.fontSize = '0.8em';
                style.textAlign = 'center';
                style.padding = '3px';
            },

            onBeforePlotNode: function(node) {
                //add some color to the nodes in the path between the
                //root node and the selected node.
                if (node.selected) {
                    node.data.$color = "#ff7";
                }
                else {
                    delete node.data.$color;
                    //if the node belongs to the last plotted level
                    if (!node.anySubnode("exist")) {
                        //count children number
                        var count = 0;
                        node.eachSubnode(function(n) {
                            count++;
                        });
                    }
                }
            },

            onBeforePlotLine: function(adj) {
                if (adj.nodeFrom.selected && adj.nodeTo.selected) {
                    adj.data.$color = "#eed";
                    adj.data.$lineWidth = 3;
                }
                else {
                    delete adj.data.$color;
                    delete adj.data.$lineWidth;
                }
            }
        });
        //load json data
        st.loadJSON(datamap_data);
        //compute node positions and layout
        st.compute();
        //optional: make a translation of the tree
        st.geom.translate(new $jit.Complex(-200, 0), "current");
        //emulate a click on the root node.
        st.onClick(st.root);
        //end


    }
})();