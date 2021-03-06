import {Vector4} from '../math/Vector4'
import {Vector3} from '../math/Vector3'
import {Vector2} from '../math/Vector2'
import {Color} from '../math/Color'

/**
 * @author mrdoob / http://mrdoob.com/
 * @author corruptedzulu / http://github.com/corruptedzulu
 * @author Joe Pea / http://github.com/trusktr
 */

/**
 * @see <a href="https://github.com/mrdoob/three.js/blob/master/src/core/BufferAttribute.js">src/core/BufferAttribute.js</a>
 */
export class BufferAttribute {
	uuid: string
	array: Float32Array
	itemSize: number
	dynamic: boolean
	updateRange: Object //{offset: number; count: number}
	version: number
	normalized: boolean
	needsUpdate: boolean
	count: number
	//onUpload: Function
	onUploadCallback: Function

	constructor(array: Float32Array, itemSize: number, normalized?: boolean) {
		// array parameter should be TypedArray.

		this.array = array
		this.itemSize = itemSize
		this.count = array !== undefined ? array.length / itemSize : 0
		this.normalized = normalized === true

		this.dynamic = false
		this.updateRange = {offset: 0, count: -1}

		this.version = 0
	}

	// setArray(array: TypedArray<number>): this {
	//     this.count = array !== undefined ? array.length / this.itemSize : 0;
	// 	this.array = array;

	// 	return this;
	// }

	// setDynamic(dynamic: boolean): this {
	//     this.dynamic = dynamic;

	// 	return this;
	// }

	// clone(): BufferAttribute {
	//     return new BufferAttribute( this.array, this.itemSize ).copy( this );
	// }

	// copy(source: BufferAttribute): this {

	// 	this.array = new Float32Array( source.array.length );

	// 	for (let i = 0, l = source.array.length; i < l; i++) {
	// 		this.array[i] = source.array[i]
	// 	}

	// 	this.itemSize = source.itemSize;
	// 	this.count = source.count;
	// 	this.normalized = source.normalized;

	// 	this.dynamic = source.dynamic;

	// 	return this;
	// }

	// copyAt(index1: number, attribute: BufferAttribute, index2: number): this {
	//     index1 *= this.itemSize;
	// 	index2 *= attribute.itemSize;

	// 	for ( var i = 0, l = this.itemSize; i < l; i ++ ) {

	// 		this.array[ index1 + i ] = attribute.array[ index2 + i ];

	// 	}

	// 	return this;
	// }

	// copyArray(array: Float32Array): this {
	// 	if (array.length > this.array.length) throw new Error("Source array is bigger than the target array.")

	// 	// TODO, type definitions not working for memory.copy version.
	// 	// memory.copy(array.dataStart, this.array.dataStart, array.length)

	// 	for (let i = 0, l = array.length; i < l; i++) {
	// 		this.array[i] = array[i]
	// 	}

	// 	return this;
	// }

	copyColorsArray(colors: Color[] /*{r: number; g: number; b: number}[]*/): this {
		var array = this.array,
			offset = 0

		for (var i = 0, l = colors.length; i < l; i++) {
			var color = colors[i]

			if (color === undefined) {
				//console.warn( 'THREE.BufferAttribute.copyColorsArray(): color is undefined', i );
				color = new Color()
			}

			array[offset++] = color.r
			array[offset++] = color.g
			array[offset++] = color.b
		}

		return this
	}

	copyVector2sArray(vectors: Vector2[] /*{x: number; y: number}[]*/): this {
		var array = this.array,
			offset = 0

		for (var i = 0, l = vectors.length; i < l; i++) {
			var vector = vectors[i]

			if (vector === undefined) {
				//console.warn( 'THREE.BufferAttribute.copyVector2sArray(): vector is undefined', i );
				vector = new Vector2()
			}

			array[offset++] = vector.x
			array[offset++] = vector.y
		}

		return this
	}

	copyVector3sArray(vectors: Vector3[] /*{x: number; y: number; z: number}[]*/): this {
		var array = this.array,
			offset = 0

		for (var i = 0, l = vectors.length; i < l; i++) {
			var vector = vectors[i]

			if (vector === undefined) {
				//console.warn( 'THREE.BufferAttribute.copyVector3sArray(): vector is undefined', i );
				vector = new Vector3()
			}

			array[offset++] = vector.x
			array[offset++] = vector.y
			array[offset++] = vector.z
		}

		return this
	}

	// copyVector4sArray(vectors: {x: number; y: number; z: number; w: number}[]): this {
	//     var array = this.array, offset = 0;

	// 	for ( var i = 0, l = vectors.length; i < l; i ++ ) {

	// 		var vector = vectors[ i ];

	// 		if ( vector === undefined ) {

	// 			//console.warn( 'THREE.BufferAttribute.copyVector4sArray(): vector is undefined', i );
	// 			vector = new Vector4();

	// 		}

	// 		array[ offset ++ ] = vector.x;
	// 		array[ offset ++ ] = vector.y;
	// 		array[ offset ++ ] = vector.z;
	// 		array[ offset ++ ] = vector.w;

	// 	}

	// 	return this;
	// }

	// set(value: Float32Array, offset?: number): this {

	// 	if ( offset === undefined ) offset = 0;

	// 	this.copyArray(value.subarray(offset))

	// 	// this.array.set( value, offset );

	// 	return this;
	// }

	// getX(index: number): number {
	//     return this.array[ index * this.itemSize ];
	// }

	// setX(index: number, x: number): this {
	//     this.array[ index * this.itemSize ] = x;

	// 	return this;
	// }

	// getY(index: number): number {
	//     return this.array[ index * this.itemSize + 1 ];
	// }

	// setY(index: number, y: number): this {
	//     this.array[ index * this.itemSize + 1 ] = y;

	// 	return this;
	// }

	// getZ(index: number): number {
	//     return this.array[ index * this.itemSize + 2 ];
	// }

	// setZ(index: number, z: number): this {
	//     this.array[ index * this.itemSize + 2 ] = z;

	// 	return this;
	// }

	// getW(index: number): number {
	//     return this.array[ index * this.itemSize + 3 ];
	// }

	// setW(index: number, w: number): this {
	//     this.array[ index * this.itemSize + 3 ] = w;

	// 	return this;
	// }

	// setXY(index: number, x: number, y: number): this {
	//     index *= this.itemSize;

	// 	this.array[ index + 0 ] = x;
	// 	this.array[ index + 1 ] = y;

	// 	return this;
	// }

	// setXYZ(index: number, x: number, y: number, z: number): this {
	//     index *= this.itemSize;

	// 	this.array[ index + 0 ] = x;
	// 	this.array[ index + 1 ] = y;
	// 	this.array[ index + 2 ] = z;

	// 	return this;
	// }

	// setXYZW(index: number, x: number, y: number, z: number, w: number): this {
	//     index *= this.itemSize;

	// 	this.array[ index + 0 ] = x;
	// 	this.array[ index + 1 ] = y;
	// 	this.array[ index + 2 ] = z;
	// 	this.array[ index + 3 ] = w;

	// 	return this;
	// }

	onUpload(callback: Function): this {
		this.onUploadCallback = callback

		return this
	}

	// toJSON(): any {

	// 	return {
	// 		itemSize: this.itemSize,
	// 		// type: this.array.constructor.name,
	// 		// array: Array.prototype.slice.call( this.array ),
	// 		array: this.array,
	// 		normalized: this.normalized
	// 	};

	// }
}

export class Int8BufferAttribute extends BufferAttribute {
	constructor(array: Int8Array, itemSize: number, normalized?: boolean) {
		super(array, itemSize, normalized)
	}
}

export class Uint8BufferAttribute extends BufferAttribute {
	constructor(array: Uint8Array, itemSize: number, normalized?: boolean) {
		super(array, itemSize, normalized)
	}
}

export class Uint8ClampedBufferAttribute extends BufferAttribute {
	constructor(array: Uint8ClampedArray, itemSize: number, normalized?: boolean) {
		super(array, itemSize, normalized)
	}
}

export class Int16BufferAttribute extends BufferAttribute {
	constructor(array: Int16Array, itemSize: number, normalized?: boolean) {
		super(array, itemSize, normalized)
	}
}

export class Uint16BufferAttribute extends BufferAttribute {
	constructor(array: Uint16Array, itemSize: number, normalized?: boolean) {
		super(array, itemSize, normalized)
	}
}

export class Int32BufferAttribute extends BufferAttribute {
	constructor(array: Int32Array, itemSize: number, normalized?: boolean) {
		super(array, itemSize, normalized)
	}
}

export class Uint32BufferAttribute extends BufferAttribute {
	constructor(array: Uint32Array, itemSize: number, normalized?: boolean) {
		super(array, itemSize, normalized)
	}
}

export class Float32BufferAttribute extends BufferAttribute {
	constructor(array: Float32Array, itemSize: number, normalized?: boolean) {
		super(array, itemSize, normalized)
	}
}

export class Float64BufferAttribute extends BufferAttribute {
	constructor(array: Float64Array, itemSize: number, normalized?: boolean) {
		super(array, itemSize, normalized)
	}
}
