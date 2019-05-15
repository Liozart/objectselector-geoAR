/*
 * --------------------------------------------------------Banner class--------------------------------------------------------------------
 */
class Banner {
    constructor(bannertext) {
        this.color_plane = new THREE.Color();
        this.color_plane.setHex("0x00ff00");

        this.color_text_in = new THREE.Color();
        this.color_text_in.setHex("0xff0000");

        this.color_text_out = new THREE.Color();
        this.color_text_out.setHex("0x0000ff");

        this.banner_text = bannertext;

        this.mesh_plane = null;
        this.mesh_text = null;
        this.mesh_group = new THREE.Group();
    }

    /*
     * Create and return a new banner
     */
    createBanner(){
        var self = this;
        return new Promise(function(resolve, reject){
            //Create back plane
            var geometry = new THREE.PlaneGeometry(700, 130);
            var material = new THREE.MeshLambertMaterial( { color: self.color_plane, side: THREE.DoubleSide,
            transparent: true, opacity: 1.0} );
            self.mesh_plane = new THREE.Mesh( geometry, material );
            self.mesh_plane.castShadow = true;
            self.mesh_plane.receiveShadow = true;
            //Create text
            var materialFront = new THREE.MeshBasicMaterial( { color: self.color_text_in } );
            var materialSide = new THREE.MeshBasicMaterial( { color: self.color_text_out } );
            var materialArray = [ materialFront, materialSide ];
            var loader = new THREE.FontLoader();
            loader.load( "fonts/helvetiker_regular.typeface.json", function ( font ) {
                var geometry = new THREE.TextGeometry( self.banner_text, {
                    font: font,
                    size: 80,
                    height: 5,
                    curveSegments: 12,
                    bevelEnabled: true,
                    bevelThickness: 8,
                    bevelSize: 6,
                    bevelOffset: 0,
                    bevelSegments: 5
                });
                self.mesh_text = new THREE.Mesh(geometry, materialArray);
                self.mesh_text.castShadow = true;
                self.mesh_text.receiveShadow = true;
                var box = new THREE.Box3().setFromObject( self.mesh_text ).getSize();

                //Merge the two objects
                self.mesh_group.add( self.mesh_plane );
                self.mesh_group.add( self.mesh_text );
                //Center the text
                self.mesh_plane.position.set((box.x / 2), (box.y / 3), -20.0);
                self.mesh_group.position.set(-(box.x / 2), 100, 0);
                //return the group
                resolve(self.mesh_group);
            });
        });
    }

    /*
     * Change the plane's color
     */
    changePlaneColor(color){
        var self = this;
        self.color_plane = color;
        self.mesh_plane.material.color.setHex(color);
    }

    /*
     * Change the text color
     */
    changeTextColor(color, isColorIn){
        var self = this;
        console.log(color + " " + isColorIn);
        if (isColorIn){
            self.color_text_in = color;
            self.mesh_text.material[0].color.set(self.color_text_in);
        }
        else {
            self.color_text_out = color;
            self.mesh_text.material[1].color.set(self.color_text_out);
        }
    }

    /*
     * Change the text font
     */
    changeTextFont(fontName, scene) {
        var self = this;
        //Create new text mesh
        var materialFront = new THREE.MeshBasicMaterial({color: self.color_text_in});
        var materialSide = new THREE.MeshBasicMaterial({color: self.color_text_out});
        var materialArray = [materialFront, materialSide];
        var loader = new THREE.FontLoader();
        loader.load("fonts/" + fontName + ".typeface.json", function (font) {
            var geometry = new THREE.TextGeometry(self.banner_text, {
                font: font,
                size: 80,
                height: 5,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 8,
                bevelSize: 6,
                bevelOffset: 0,
                bevelSegments: 5
            });
            self.mesh_group.remove(self.mesh_text);
            scene.remove(self.mesh_text);
            self.mesh_text = null;
            self.mesh_text = new THREE.Mesh(geometry, materialArray);
            self.mesh_text.castShadow = true;
            self.mesh_text.receiveShadow = true;
            self.mesh_group.add(self.mesh_text);
        });
    }
}

/*
 * --------------------------------------------------------Ellipse class--------------------------------------------------------------------
 */

class Ellipse {
    constructor(text) {
        this.color_cylinder = new THREE.Color();
        this.color_cylinder.setHex("0x00ff00");

        this.color_text_in = new THREE.Color();
        this.color_text_in.setHex("0xff0000");

        this.color_text_out = new THREE.Color();
        this.color_text_out.setHex("0x0000ff");

        this.ellipse_text = text;

        this.mesh_ellipse = null;
        this.mesh_text = null;
        this.mesh_group = new THREE.Group();
    }

    /*
    * Create and return a new ellipse
    */
    createEllipse(){
        var self = this;
        return new Promise(function(resolve, reject){
            var curve = new THREE.EllipseCurve(
                0,  0,            // ax, aY
                200, 100,           // xRadius, yRadius
                0,  2 * Math.PI,  // aStartAngle, aEndAngle
                false,            // aClockwise
                0                 // aRotation
            );

            var points = curve.getPoints( 50 );
            var geometry = new THREE.BufferGeometry().setFromPoints( points );

            var material = new THREE.LineBasicMaterial( { color : 0xff0000 } );

            // Create the final object to add to the scene
            self.mesh_ellipse = new THREE.Line( geometry, material );
            self.mesh_ellipse.castShadow = true;
            self.mesh_ellipse.receiveShadow = true;
            resolve(self.mesh_ellipse);
            //Create text
            var materialFront = new THREE.MeshBasicMaterial( { color: self.color_text_in } );
            var materialSide = new THREE.MeshBasicMaterial( { color: self.color_text_out } );
            var materialArray = [ materialFront, materialSide ];
            var loader = new THREE.FontLoader();
            loader.load( "fonts/helvetiker_regular.typeface.json", function ( font ) {
                var geometry = new THREE.TextGeometry( self.ellipse_text, {
                    font: font,
                    size: 80,
                    height: 5,
                    curveSegments: 12,
                    bevelEnabled: true,
                    bevelThickness: 8,
                    bevelSize: 6,
                    bevelOffset: 0,
                    bevelSegments: 5
                });
                self.mesh_text = new THREE.Mesh(geometry, materialArray);
                self.mesh_text.castShadow = true;
                self.mesh_text.receiveShadow = true;
                var box = new THREE.Box3().setFromObject( self.mesh_text ).getSize();

                //Merge the two objects
                self.mesh_group.add( self.mesh_cylinder );
                self.mesh_group.add( self.mesh_text );
                //Center the text
                self.mesh_cylinder.position.set((box.x / 2), (box.y / 3), -20.0);
                self.mesh_group.position.set(-(box.x / 2), 100, 0);
                //return the group
                resolve(self.mesh_group);
            });
        });
    }

}

class Circulary {
    constructor() {}

}

class Parade {
    constructor() {}

}