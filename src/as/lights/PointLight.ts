import { Light } from './Light';
import { PerspectiveCamera } from './../cameras/PerspectiveCamera';
import { LightShadow } from './LightShadow';

export class PointLightShadow extends LightShadow {
	camera: PerspectiveCamera;
}

/**
 * Affects objects using {@link MeshLambertMaterial} or {@link MeshPhongMaterial}.
 *
 * @example
 * var light = new THREE.PointLight( 0xff0000, 1, 100 );
 * light.position.set( 50, 50, 50 );
 * scene.add( light );
 */
export class PointLight extends Light {
    readonly type: string = 'PointLight'

    readonly isPointLight: boolean = true

    /**
    * If non-zero, light will attenuate linearly from maximum intensity at light position down to zero at distance.
    * Default — 0.0.
    */
    distance: number

    decay: number

    shadow: PointLightShadow = new PointLightShadow(new PerspectiveCamera( 90, 1, 0.5, 500 ))

    get power(): f64 {
        // intensity = power per solid angle.
        // ref: equation (15) from https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf
        return this.intensity * 4 * Math.PI;
    }

    set power(newPower: f64) {
        // intensity = power per solid angle.
        // ref: equation (15) from https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf
        this.intensity = newPower / ( 4 * Math.PI );
    }

    // TODO: allow overloads
    // constructor(color?: Color | string | number)
	constructor(
        color?: u32,
		intensity?: number,
		distance: number = 0,
		decay: number = 1
	) {
        super(color, intensity)
        this.distance = distance
        this.decay = decay
    }

    copy(source: PointLight, recursive?: boolean): this {
        super.copy(source, recursive)
        this.distance = source.distance
        this.decay = source.decay
        this.shadow = source.shadow.clone()
        return this;
    }
}
