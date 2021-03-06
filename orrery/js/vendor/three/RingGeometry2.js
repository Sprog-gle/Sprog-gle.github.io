/**
    
    @author : Kevin M. Gill http://planetmaker.wthr.us/

*/


/** A modification of the standard three.js RingGeometry class, but with changes to support 
 * Celestia-like ring textures.
 */
THREE.RingGeometry2 = function ( innerRadius, outerRadius, thetaSegments, phiSegments, thetaStart, thetaLength ) {

    THREE.Geometry.call( this );

    innerRadius = innerRadius || 0;
    outerRadius = outerRadius || 50;

    thetaStart = thetaStart !== undefined ? thetaStart : 0;
    thetaLength = thetaLength !== undefined ? thetaLength : Math.PI * 2;

    thetaSegments = thetaSegments !== undefined ? Math.max( 3, thetaSegments ) : 8;
    phiSegments = phiSegments !== undefined ? Math.max( 3, phiSegments ) : 8;
    
    var i, o, uvs = [], radius = innerRadius, radiusStep = ( ( outerRadius - innerRadius ) / phiSegments);
	

	
    for( i = 0; i <= phiSegments; i++) {//concentric circles inside ring

        for( o = 0; o <= thetaSegments; o++) {//number of segments per circle

            var vertex = new THREE.Vector3();
            
            vertex.x = radius * Math.cos( thetaStart + o / thetaSegments * thetaLength );
            vertex.y = -radius * Math.sin( thetaStart + o / thetaSegments * thetaLength );
            
            this.vertices.push( vertex );
			uvs.push( new THREE.Vector2((i / phiSegments), ( vertex.y / radius + 1 ) / 2));
        }
        
        radius += radiusStep;

    }
	
	
    var n = new THREE.Vector3( 0, 0, 1 );
    
    for( i = 0; i < phiSegments; i++) {//concentric circles inside ring

        for( o = 0; o <= thetaSegments; o++) {//number of segments per circle
            
            var v1, v2, v3;

            v1 = o + (thetaSegments * i) + i;
            v2 = o + (thetaSegments * i) + thetaSegments + i;
            v3 = o + (thetaSegments * i) + thetaSegments + 1 + i;
            
            this.faces.push( new THREE.Face3( v1, v2, v3, [ n, n, n ] ) );
            this.faceVertexUvs[ 0 ].push( [ uvs[ v1 ], uvs[ v2 ], uvs[ v3 ] ]);
            
            v1 = o + (thetaSegments * i) + i;
            v2 = o + (thetaSegments * i) + thetaSegments + 1 + i;
            v3 = o + (thetaSegments * i) + 1 + i;
            
            this.faces.push( new THREE.Face3( v1, v2, v3, [ n, n, n ] ) );
            this.faceVertexUvs[ 0 ].push( [ uvs[ v1 ], uvs[ v2 ], uvs[ v3 ] ]);

        }
    }
    
    this.computeCentroids();
    this.computeFaceNormals();

    this.boundingSphere = new THREE.Sphere( new THREE.Vector3(), radius ); 

};

THREE.RingGeometry2.prototype = Object.create( THREE.Geometry.prototype );