import { Object3D } from '../core/Object3D.js';
import { Color } from '../math/Color.js';
import { LightShadow } from './LightShadow';

/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 * @author bogidon / http://bogdanvitoc.com/
 */

 /**
 * Abstract base class for lights.
 */
export abstract class Light extends Object3D {
    readonly type: string = 'Light'

    readonly isLight: boolean = true
    
    color: Color;

    intensity: f64;

    abstract shadow: LightShadow;

    // TODO: allow overloads
    // constructor( hex?: string, intensity?: number )
	constructor( hex?: u32, intensity: number = 1 ) {
        super();
        this.color = new Color(hex)
        this.intensity = intensity
        this.receiveShadow = false
    }

    copy(source: Light, recursive?: boolean): this {
        super.copy(source, recursive)
        this.color.copy(source.color)
        this.intensity = source.intensity
        return this;
    }

    // TODO: json
    // toJSON: function ( meta ) {

	// 	var data = Object3D.prototype.toJSON.call( this, meta );

	// 	data.object.color = this.color.getHex();
	// 	data.object.intensity = this.intensity;

	// 	if ( this.groundColor !== undefined ) data.object.groundColor = this.groundColor.getHex();

	// 	if ( this.distance !== undefined ) data.object.distance = this.distance;
	// 	if ( this.angle !== undefined ) data.object.angle = this.angle;
	// 	if ( this.decay !== undefined ) data.object.decay = this.decay;
	// 	if ( this.penumbra !== undefined ) data.object.penumbra = this.penumbra;

	// 	if ( this.shadow !== undefined ) data.object.shadow = this.shadow.toJSON();

	// 	return data;

	// }
}
