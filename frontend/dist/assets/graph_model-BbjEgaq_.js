import{g as e,b4 as t}from"./ui-DU2Rt7ym.js";function n(e,t){for(var n=0;n<t.length;n++){const r=t[n];if("string"!=typeof r&&!Array.isArray(r))for(const t in r)if("default"!==t&&!(t in e)){const n=Object.getOwnPropertyDescriptor(r,t);n&&Object.defineProperty(e,t,n.get?n:{enumerable:!0,get:()=>r[t]})}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class r{constructor(e,t){this.backend=e,this.dataMover=t,this.data=new WeakMap,this.dataIdsCount=0}get(e){return this.data.has(e)||this.dataMover.moveData(this.backend,e),this.data.get(e)}set(e,t){this.dataIdsCount++,this.data.set(e,t)}has(e){return this.data.has(e)}delete(e){return this.dataIdsCount--,this.data.delete(e)}numDataIds(){return this.dataIdsCount}}class a{refCount(e){return s("refCount")}incRef(e){return s("incRef")}timerAvailable(){return!0}time(e){return s("time")}read(e){return s("read")}readSync(e){return s("readSync")}readToGPU(e,t){return s("readToGPU")}numDataIds(){return s("numDataIds")}disposeData(e,t){return s("disposeData")}write(e,t,n){return s("write")}move(e,t,n,r,a){return s("move")}createTensorFromGPUData(e,t,n){return s("createTensorFromGPUData")}memory(){return s("memory")}floatPrecision(){return s("floatPrecision")}epsilon(){return 32===this.floatPrecision()?1e-7:1e-4}dispose(){return s("dispose")}}function s(e){throw new Error(`'${e}' not yet implemented or not found in the registry. This kernel may not be supported by the tfjs backend you have chosen`)}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function o(e){let t=e.length,n=0;for(;t>0;)n=Math.random()*t|0,t--,l(e,t,n)}function i(e,t,n){return Math.max(e,Math.min(t,n))}function u(e){return e%2==0?e:e+1}function l(e,t,n){const r=e[t];e[t]=e[n],e[n]=r}function c(e){let t=0;for(let n=0;n<e.length;n++)t+=e[n];return t}function p(e,t){if(!e)throw new Error("string"==typeof t?t:t())}function d(e,t,n=""){p(g(e,t),()=>n+` Shapes ${e} and ${t} must match`)}function h(e){p(null!=e,()=>"The input to the tensor constructor must be a non-null value.")}function m(e){if(0===e.length)return 1;let t=e[0];for(let n=1;n<e.length;n++)t*=e[n];return t}function f(e,t){if(e===t)return!0;if(null==e||null==t)return!1;if(e.length!==t.length)return!1;for(let n=0;n<e.length;n++)if(null!==e[n]&&null!==t[n]&&e[n]!==t[n])return!1;return!0}function g(e,t){if(e===t)return!0;if(null==e||null==t)return!1;if(e.length!==t.length)return!1;for(let n=0;n<e.length;n++)if(e[n]!==t[n])return!1;return!0}function y(e){return e%1==0}function b(e){const t=Math.ceil(Math.sqrt(e));return[t,Math.ceil(e/t)]}function w(e,t){return t<=e.length?e:e+" ".repeat(t-e.length)}function x(e,t=e=>0,n,r){return new Promise((a,s)=>{let o=0;const i=()=>{if(e())return void a();o++;const u=t(o);null!=n&&o>=n?s():null!=r?r(i,u):setTimeout(i,u)};i()})}function N(e,t){let n=1,r=-1;for(let s=0;s<e.length;++s)if(e[s]>=0)n*=e[s];else if(-1===e[s]){if(-1!==r)throw Error(`Shapes can only have 1 implicit size. Found -1 at dim ${r} and dim ${s}`);r=s}else if(e[s]<0)throw Error(`Shapes can not be < 0. Found ${e[s]} at dim ${s}`);if(-1===r){if(t>0&&t!==n)throw Error(`Size(${t}) must match the product of shape ${e}`);return e}if(0===n)throw Error(`Cannot infer the missing size in [${e}] when there are 0 elements`);if(t%n!==0)throw Error(`The implicit shape can't be a fractional number. Got ${t} / ${n}`);const a=e.slice();return a[r]=t/n,a}function S(e,t){const n=t.length;return p((e=null==e?t.map((e,t)=>t):[].concat(e)).every(e=>e>=-n&&e<n),()=>`All values in axis param must be in range [-${n}, ${n}) but got axis ${e}`),p(e.every(e=>y(e)),()=>`All values in axis param must be integers but got axis ${e}`),e.map(e=>e<0?n+e:e)}function v(e,t){const n=[],r=[],a=null!=t&&Array.isArray(t)&&0===t.length,s=null==t||a?null:S(t,e).sort();let o=0;for(let i=0;i<e.length;++i){if(null!=s){if(s[o]===i&&1!==e[i])throw new Error(`Can't squeeze axis ${i} since its dim '${e[i]}' is not 1`);(null==s[o]||s[o]>i)&&1===e[i]&&(n.push(e[i]),r.push(i)),s[o]<=i&&o++}1!==e[i]&&(n.push(e[i]),r.push(i))}return{newShape:n,keptDims:r}}function T(e,t){return k(e,t)}function k(e,t){let n=null;if(null==e||"float32"===e)n=new Float32Array(t);else if("int32"===e)n=new Int32Array(t);else if("bool"===e)n=new Uint8Array(t);else{if("string"!==e)throw new Error(`Unknown data type ${e}`);n=new Array(t)}return n}function E(e,t){for(let n=0;n<e.length;n++){const r=e[n];if(isNaN(r)||!isFinite(r))throw Error(`A tensor of type ${t} being uploaded contains ${r}.`)}}function _(e){return"bool"===e||"complex64"===e||"float32"===e||"int32"===e||"string"===e}function I(e,t){return"complex64"!==t&&(("float32"!==t||"complex64"===e)&&(("int32"!==t||"float32"===e||"complex64"===e)&&("bool"!==t||"bool"!==e)))}function A(e){if("float32"===e||"int32"===e)return 4;if("complex64"===e)return 8;if("bool"===e)return 1;throw new Error(`Unknown dtype ${e}`)}function M(e){if(null==e)return 0;let t=0;return e.forEach(e=>t+=e.length),t}function $(e){return"string"==typeof e||e instanceof String}function O(e){return"boolean"==typeof e}function D(e){return"number"==typeof e}function R(e){return Array.isArray(e)?R(e[0]):e instanceof Float32Array?"float32":e instanceof Int32Array||e instanceof Uint8Array||e instanceof Uint8ClampedArray?"int32":D(e)?"float32":$(e)?"string":O(e)?"bool":"float32"}function C(e){return!!(e&&e.constructor&&e.call&&e.apply)}function F(e,t){for(let n=t;n<e;++n)if(e%n===0)return n;return e}function B(e){const t=e.length;if(t<2)return[];const n=new Array(t-1);n[t-2]=e[t-1];for(let r=t-3;r>=0;--r)n[r]=n[r+1]*e[r+1];return n}function z(e,t,n,r=!1){const a=new Array;if(1===t.length){const s=t[0]*(r?2:1);for(let t=0;t<s;t++)a[t]=n[e+t]}else{const s=t[0],o=t.slice(1),i=o.reduce((e,t)=>e*t)*(r?2:1);for(let t=0;t<s;t++)a[t]=z(e+t*i,o,n,r)}return a}function L(e,t,n=!1){if(0===e.length)return t[0];const r=e.reduce((e,t)=>e*t)*(n?2:1);if(0===r)return[];if(r!==t.length)throw new Error(`[${e}] does not match the input size ${t.length}${n?" for a complex tensor":""}.`);return z(0,e,t,n)}function P(e,t){if(Array.isArray(e))return e;if("float32"===t)return e instanceof Float32Array?e:new Float32Array(e);if("int32"===t)return e instanceof Int32Array?e:new Int32Array(e);if("bool"===t||"string"===t)return Uint8Array.from(new Int32Array(e));throw new Error(`Unknown dtype ${t}`)}function V(e,t){const n=U(e,t);for(let r=0;r<n.length;r++)n[r]=1;return n}function U(e,t){if(null==t||"float32"===t||"complex64"===t)return new Float32Array(e);if("int32"===t)return new Int32Array(e);if("bool"===t)return new Uint8Array(e);throw new Error(`Unknown data type ${t}`)}function j(e,t){const n=e.reduce((e,t)=>e*t,1);if(null==t||"float32"===t)return L(e,new Float32Array(n));if("int32"===t)return L(e,new Int32Array(n));if("bool"===t)return L(e,new Uint8Array(n));throw new Error(`Unknown data type ${t}`)}function W(e){e.forEach(t=>{p(Number.isInteger(t)&&t>=0,()=>`Tensor must have a shape comprised of positive integers but got shape [${e}].`)})}function G(e,t,n){if(0===t)return 0;if(1===t)return e[0];let r=e[e.length-1];for(let a=0;a<e.length-1;++a)r+=n[a]*e[a];return r}function q(e,t,n){if(0===t)return[];if(1===t)return[e];const r=new Array(t);for(let a=0;a<r.length-1;++a)r[a]=Math.floor(e/n[a]),e-=r[a]*n[a];return r[r.length-1]=e,r}function K(e){return e&&e.then&&"function"==typeof e.then}
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const H="tfjsflags";class Z{constructor(e){this.global=e,this.flags={},this.flagRegistry={},this.urlFlags={},this.getQueryParams=J,this.populateURLFlags()}setPlatform(e,t){null!=this.platform&&!X().getBool("IS_TEST")&&X().getBool("PROD"),this.platformName=e,this.platform=t}registerFlag(e,t,n){if(this.flagRegistry[e]={evaluationFn:t,setHook:n},null!=this.urlFlags[e]){const t=this.urlFlags[e];!X().getBool("IS_TEST")&&X().getBool("PROD"),this.set(e,t)}}async getAsync(e){return e in this.flags||(this.flags[e]=await this.evaluateFlag(e)),this.flags[e]}get(e){if(e in this.flags)return this.flags[e];const t=this.evaluateFlag(e);if(K(t))throw new Error(`Flag ${e} cannot be synchronously evaluated. Please use getAsync() instead.`);return this.flags[e]=t,this.flags[e]}getNumber(e){return this.get(e)}getBool(e){return this.get(e)}getString(e){return this.get(e)}getFlags(){return this.flags}get features(){return this.flags}set(e,t){if(null==this.flagRegistry[e])throw new Error(`Cannot set flag ${e} as it has not been registered.`);this.flags[e]=t,null!=this.flagRegistry[e].setHook&&this.flagRegistry[e].setHook(t)}evaluateFlag(e){if(null==this.flagRegistry[e])throw new Error(`Cannot evaluate flag '${e}': no evaluation function found.`);return this.flagRegistry[e].evaluationFn()}setFlags(e){this.flags=Object.assign({},e)}reset(){this.flags={},this.urlFlags={},this.populateURLFlags()}populateURLFlags(){if(void 0===this.global||void 0===this.global.location||void 0===this.global.location.search)return;const e=this.getQueryParams(this.global.location.search);if(H in e){e[H].split(",").forEach(e=>{const[t,n]=e.split(":");this.urlFlags[t]=function(e,t){const n=t.toLowerCase();return"true"===n||"false"===n?"true"===n:""+ +n===n?+n:t}(0,n)})}}}function J(e){const t={};return e.replace(/[?&]([^=?&]+)(?:=([^&]*))?/g,(e,...n)=>(function(e,t,n){e[decodeURIComponent(t)]=decodeURIComponent(n||"")}(t,n[0],n[1]),n.join("="))),t}function X(){return Q}let Y,Q=null;function ee(){if(null==Y){let e;if("undefined"!=typeof window)e=window;else if("undefined"!=typeof global)e=global;else if("undefined"!=typeof process)e=process;else{if("undefined"==typeof self)throw new Error("Could not find a global object");e=self}Y=e}return Y}function te(e,t){const n=function(){const e=ee();return null==e._tfGlobals&&(e._tfGlobals=new Map),e._tfGlobals}();if(n.has(e))return n.get(e);{const r=t();return n.set(e,r),n.get(e)}}const ne="Abs",re="Acos",ae="Acosh",se="Add",oe="AddN",ie="All",ue="Any",le="ArgMax",ce="ArgMin",pe="Asin",de="Asinh",he="Atan",me="Atanh",fe="Atan2",ge="AvgPool",ye="AvgPoolGrad",be="AvgPool3D",we="AvgPool3DGrad",xe="BatchMatMul",Ne="BatchToSpaceND",Se="Bincount",ve="BitwiseAnd",Te="BroadcastTo",ke="BroadcastArgs",Ee="Cast",_e="Ceil",Ie="ClipByValue",Ae="Complex",Me="ComplexAbs",$e="Concat",Oe="Conv2D",De="Conv2DBackpropFilter",Re="Conv2DBackpropInput",Ce="Conv3D",Fe="Conv3DBackpropFilterV2",Be="Conv3DBackpropInputV2",ze="Cos",Le="Cosh",Pe="Cumprod",Ve="Cumsum",Ue="CropAndResize",je="DenseBincount",We="DepthToSpace",Ge="DepthwiseConv2dNative",qe="DepthwiseConv2dNativeBackpropFilter",Ke="DepthwiseConv2dNativeBackpropInput",He="Diag",Ze="Dilation2D",Je="Dilation2DBackpropInput",Xe="Dilation2DBackpropFilter",Ye="Draw",Qe="RealDiv",et="Einsum",tt="Elu",nt="EluGrad",rt="Erf",at="Equal",st="Exp",ot="ExpandDims",it="Expm1",ut="FFT",lt="Fill",ct="FlipLeftRight",pt="Floor",dt="FloorDiv",ht="FusedBatchNorm",mt="GatherV2",ft="GatherNd",gt="Greater",yt="GreaterEqual",bt="Identity",wt="IFFT",xt="Imag",Nt="IsFinite",St="IsInf",vt="IsNan",Tt="LeakyRelu",kt="Less",Et="LessEqual",_t="LinSpace",It="Log",At="Log1p",Mt="LogicalAnd",$t="LogicalNot",Ot="LogicalOr",Dt="LogicalXor",Rt="LogSoftmax",Ct="LowerBound",Ft="LRN",Bt="LRNGrad",zt="MatrixBandPart",Lt="Max",Pt="Maximum",Vt="MaxPool",Ut="MaxPoolGrad",jt="MaxPool3D",Wt="MaxPool3DGrad",Gt="MaxPoolWithArgmax",qt="Mean",Kt="Min",Ht="Minimum",Zt="MirrorPad",Jt="Mod",Xt="Multinomial",Yt="Multiply",Qt="Neg",en="NotEqual",tn="NonMaxSuppressionV3",nn="NonMaxSuppressionV4",rn="NonMaxSuppressionV5",an="OnesLike",sn="OneHot",on="Pack",un="PadV2",ln="Pool",cn="Pow",pn="Prelu",dn="Prod",hn="RaggedGather",mn="RaggedRange",fn="RaggedTensorToTensor",gn="Range",yn="Real",bn="Reciprocal",wn="Relu",xn="Reshape",Nn="ResizeNearestNeighbor",Sn="ResizeNearestNeighborGrad",vn="ResizeBilinear",Tn="ResizeBilinearGrad",kn="Relu6",En="Reverse",_n="Round",In="Rsqrt",An="ScatterNd",Mn="TensorScatterUpdate",$n="SearchSorted",On="Select",Dn="Selu",Rn="Slice",Cn="Sin",Fn="Sinh",Bn="Sign",zn="Sigmoid",Ln="Softplus",Pn="Sqrt",Vn="Sum",Un="SpaceToBatchND",jn="SplitV",Wn="Softmax",Gn="SparseFillEmptyRows",qn="SparseReshape",Kn="SparseSegmentMean",Hn="SparseSegmentSum",Zn="SparseToDense",Jn="SquaredDifference",Xn="Square",Yn="StaticRegexReplace",Qn="StridedSlice",er="StringNGrams",tr="StringSplit",nr="StringToHashBucketFast",rr="Sub",ar="Tan",sr="Tanh",or="Tile",ir="TopK",ur="Transform",lr="Transpose",cr="Unique",pr="Unpack",dr="UnsortedSegmentSum",hr="UpperBound",mr="ZerosLike",fr="Step",gr="FromPixels",yr="RotateWithOffset",br="_FusedMatMul",wr="FusedConv2D",xr="FusedDepthwiseConv2D";
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function Nr(...e){!X().getBool("IS_TEST")&&X().getBool("PROD")}
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
const Sr=te("kernelRegistry",()=>new Map),vr=te("gradRegistry",()=>new Map);function Tr(e,t){const n=Or(e,t);return Sr.get(n)}function kr(e){return vr.get(e)}function Er(e){const t=Sr.entries(),n=[];for(;;){const{done:r,value:a}=t.next();if(r)break;const[s,o]=a,[i]=s.split("_");i===e&&n.push(o)}return n}function _r(e){const{kernelName:t,backendName:n}=e,r=Or(t,n);Sr.has(r)&&Nr(),Sr.set(r,e)}function Ir(e){const{kernelName:t}=e;vr.has(t)&&X().getBool("DEBUG")&&Nr(),vr.set(t,e)}function Ar(e,t){const n=Or(e,t);if(!Sr.has(n))throw new Error(`The kernel '${e}' for backend '${t}' is not registered`);Sr.delete(n)}function Mr(e){if(!vr.has(e))throw new Error(`The gradient '${e}' for backend is not registered`);vr.delete(e)}function $r(e,t){Er(e).forEach(e=>{_r(Object.assign({},e,{backendName:t}))})}function Or(e,t){return`${t}_${e}`}
/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Dr(e){return e instanceof Float32Array||e instanceof Int32Array||e instanceof Uint8Array||e instanceof Uint8ClampedArray}var Rr,Cr;var Fr=function(){if(Cr)return Rr;Cr=1,Rr=t;var e=null;try{e=new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0,97,115,109,1,0,0,0,1,13,2,96,0,1,127,96,4,127,127,127,127,1,127,3,7,6,0,1,1,1,1,1,6,6,1,127,1,65,0,11,7,50,6,3,109,117,108,0,1,5,100,105,118,95,115,0,2,5,100,105,118,95,117,0,3,5,114,101,109,95,115,0,4,5,114,101,109,95,117,0,5,8,103,101,116,95,104,105,103,104,0,0,10,191,1,6,4,0,35,0,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,126,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,127,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,128,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,129,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,130,34,4,66,32,135,167,36,0,32,4,167,11])),{}).exports}catch(T){}function t(e,t,n){this.low=0|e,this.high=0|t,this.unsigned=!!n}function n(e){return!0===(e&&e.__isLong__)}t.prototype.__isLong__,Object.defineProperty(t.prototype,"__isLong__",{value:!0}),t.isLong=n;var r={},a={};function s(e,t){var n,s,o;return t?(o=0<=(e>>>=0)&&e<256)&&(s=a[e])?s:(n=i(e,(0|e)<0?-1:0,!0),o&&(a[e]=n),n):(o=-128<=(e|=0)&&e<128)&&(s=r[e])?s:(n=i(e,e<0?-1:0,!1),o&&(r[e]=n),n)}function o(e,t){if(isNaN(e))return t?g:f;if(t){if(e<0)return g;if(e>=d)return N}else{if(e<=-h)return S;if(e+1>=h)return x}return e<0?o(-e,t).neg():i(e%p|0,e/p|0,t)}function i(e,n,r){return new t(e,n,r)}t.fromInt=s,t.fromNumber=o,t.fromBits=i;var u=Math.pow;function l(e,t,n){if(0===e.length)throw Error("empty string");if("NaN"===e||"Infinity"===e||"+Infinity"===e||"-Infinity"===e)return f;if("number"==typeof t?(n=t,t=!1):t=!!t,(n=n||10)<2||36<n)throw RangeError("radix");var r;if((r=e.indexOf("-"))>0)throw Error("interior hyphen");if(0===r)return l(e.substring(1),t,n).neg();for(var a=o(u(n,8)),s=f,i=0;i<e.length;i+=8){var c=Math.min(8,e.length-i),p=parseInt(e.substring(i,i+c),n);if(c<8){var d=o(u(n,c));s=s.mul(d).add(o(p))}else s=(s=s.mul(a)).add(o(p))}return s.unsigned=t,s}function c(e,t){return"number"==typeof e?o(e,t):"string"==typeof e?l(e,t):i(e.low,e.high,"boolean"==typeof t?t:e.unsigned)}t.fromString=l,t.fromValue=c;var p=4294967296,d=p*p,h=d/2,m=s(1<<24),f=s(0);t.ZERO=f;var g=s(0,!0);t.UZERO=g;var y=s(1);t.ONE=y;var b=s(1,!0);t.UONE=b;var w=s(-1);t.NEG_ONE=w;var x=i(-1,2147483647,!1);t.MAX_VALUE=x;var N=i(-1,-1,!0);t.MAX_UNSIGNED_VALUE=N;var S=i(0,-2147483648,!1);t.MIN_VALUE=S;var v=t.prototype;return v.toInt=function(){return this.unsigned?this.low>>>0:this.low},v.toNumber=function(){return this.unsigned?(this.high>>>0)*p+(this.low>>>0):this.high*p+(this.low>>>0)},v.toString=function(e){if((e=e||10)<2||36<e)throw RangeError("radix");if(this.isZero())return"0";if(this.isNegative()){if(this.eq(S)){var t=o(e),n=this.div(t),r=n.mul(t).sub(this);return n.toString(e)+r.toInt().toString(e)}return"-"+this.neg().toString(e)}for(var a=o(u(e,6),this.unsigned),s=this,i="";;){var l=s.div(a),c=(s.sub(l.mul(a)).toInt()>>>0).toString(e);if((s=l).isZero())return c+i;for(;c.length<6;)c="0"+c;i=""+c+i}},v.getHighBits=function(){return this.high},v.getHighBitsUnsigned=function(){return this.high>>>0},v.getLowBits=function(){return this.low},v.getLowBitsUnsigned=function(){return this.low>>>0},v.getNumBitsAbs=function(){if(this.isNegative())return this.eq(S)?64:this.neg().getNumBitsAbs();for(var e=0!=this.high?this.high:this.low,t=31;t>0&&!(e&1<<t);t--);return 0!=this.high?t+33:t+1},v.isZero=function(){return 0===this.high&&0===this.low},v.eqz=v.isZero,v.isNegative=function(){return!this.unsigned&&this.high<0},v.isPositive=function(){return this.unsigned||this.high>=0},v.isOdd=function(){return!(1&~this.low)},v.isEven=function(){return!(1&this.low)},v.equals=function(e){return n(e)||(e=c(e)),(this.unsigned===e.unsigned||this.high>>>31!=1||e.high>>>31!=1)&&(this.high===e.high&&this.low===e.low)},v.eq=v.equals,v.notEquals=function(e){return!this.eq(e)},v.neq=v.notEquals,v.ne=v.notEquals,v.lessThan=function(e){return this.comp(e)<0},v.lt=v.lessThan,v.lessThanOrEqual=function(e){return this.comp(e)<=0},v.lte=v.lessThanOrEqual,v.le=v.lessThanOrEqual,v.greaterThan=function(e){return this.comp(e)>0},v.gt=v.greaterThan,v.greaterThanOrEqual=function(e){return this.comp(e)>=0},v.gte=v.greaterThanOrEqual,v.ge=v.greaterThanOrEqual,v.compare=function(e){if(n(e)||(e=c(e)),this.eq(e))return 0;var t=this.isNegative(),r=e.isNegative();return t&&!r?-1:!t&&r?1:this.unsigned?e.high>>>0>this.high>>>0||e.high===this.high&&e.low>>>0>this.low>>>0?-1:1:this.sub(e).isNegative()?-1:1},v.comp=v.compare,v.negate=function(){return!this.unsigned&&this.eq(S)?S:this.not().add(y)},v.neg=v.negate,v.add=function(e){n(e)||(e=c(e));var t=this.high>>>16,r=65535&this.high,a=this.low>>>16,s=65535&this.low,o=e.high>>>16,u=65535&e.high,l=e.low>>>16,p=0,d=0,h=0,m=0;return h+=(m+=s+(65535&e.low))>>>16,d+=(h+=a+l)>>>16,p+=(d+=r+u)>>>16,p+=t+o,i((h&=65535)<<16|(m&=65535),(p&=65535)<<16|(d&=65535),this.unsigned)},v.subtract=function(e){return n(e)||(e=c(e)),this.add(e.neg())},v.sub=v.subtract,v.multiply=function(t){if(this.isZero())return f;if(n(t)||(t=c(t)),e)return i(e.mul(this.low,this.high,t.low,t.high),e.get_high(),this.unsigned);if(t.isZero())return f;if(this.eq(S))return t.isOdd()?S:f;if(t.eq(S))return this.isOdd()?S:f;if(this.isNegative())return t.isNegative()?this.neg().mul(t.neg()):this.neg().mul(t).neg();if(t.isNegative())return this.mul(t.neg()).neg();if(this.lt(m)&&t.lt(m))return o(this.toNumber()*t.toNumber(),this.unsigned);var r=this.high>>>16,a=65535&this.high,s=this.low>>>16,u=65535&this.low,l=t.high>>>16,p=65535&t.high,d=t.low>>>16,h=65535&t.low,g=0,y=0,b=0,w=0;return b+=(w+=u*h)>>>16,y+=(b+=s*h)>>>16,b&=65535,y+=(b+=u*d)>>>16,g+=(y+=a*h)>>>16,y&=65535,g+=(y+=s*d)>>>16,y&=65535,g+=(y+=u*p)>>>16,g+=r*h+a*d+s*p+u*l,i((b&=65535)<<16|(w&=65535),(g&=65535)<<16|(y&=65535),this.unsigned)},v.mul=v.multiply,v.divide=function(t){if(n(t)||(t=c(t)),t.isZero())throw Error("division by zero");var r,a,s;if(e)return this.unsigned||-2147483648!==this.high||-1!==t.low||-1!==t.high?i((this.unsigned?e.div_u:e.div_s)(this.low,this.high,t.low,t.high),e.get_high(),this.unsigned):this;if(this.isZero())return this.unsigned?g:f;if(this.unsigned){if(t.unsigned||(t=t.toUnsigned()),t.gt(this))return g;if(t.gt(this.shru(1)))return b;s=g}else{if(this.eq(S))return t.eq(y)||t.eq(w)?S:t.eq(S)?y:(r=this.shr(1).div(t).shl(1)).eq(f)?t.isNegative()?y:w:(a=this.sub(t.mul(r)),s=r.add(a.div(t)));if(t.eq(S))return this.unsigned?g:f;if(this.isNegative())return t.isNegative()?this.neg().div(t.neg()):this.neg().div(t).neg();if(t.isNegative())return this.div(t.neg()).neg();s=f}for(a=this;a.gte(t);){r=Math.max(1,Math.floor(a.toNumber()/t.toNumber()));for(var l=Math.ceil(Math.log(r)/Math.LN2),p=l<=48?1:u(2,l-48),d=o(r),h=d.mul(t);h.isNegative()||h.gt(a);)h=(d=o(r-=p,this.unsigned)).mul(t);d.isZero()&&(d=y),s=s.add(d),a=a.sub(h)}return s},v.div=v.divide,v.modulo=function(t){return n(t)||(t=c(t)),e?i((this.unsigned?e.rem_u:e.rem_s)(this.low,this.high,t.low,t.high),e.get_high(),this.unsigned):this.sub(this.div(t).mul(t))},v.mod=v.modulo,v.rem=v.modulo,v.not=function(){return i(~this.low,~this.high,this.unsigned)},v.and=function(e){return n(e)||(e=c(e)),i(this.low&e.low,this.high&e.high,this.unsigned)},v.or=function(e){return n(e)||(e=c(e)),i(this.low|e.low,this.high|e.high,this.unsigned)},v.xor=function(e){return n(e)||(e=c(e)),i(this.low^e.low,this.high^e.high,this.unsigned)},v.shiftLeft=function(e){return n(e)&&(e=e.toInt()),0==(e&=63)?this:e<32?i(this.low<<e,this.high<<e|this.low>>>32-e,this.unsigned):i(0,this.low<<e-32,this.unsigned)},v.shl=v.shiftLeft,v.shiftRight=function(e){return n(e)&&(e=e.toInt()),0==(e&=63)?this:e<32?i(this.low>>>e|this.high<<32-e,this.high>>e,this.unsigned):i(this.high>>e-32,this.high>=0?0:-1,this.unsigned)},v.shr=v.shiftRight,v.shiftRightUnsigned=function(e){if(n(e)&&(e=e.toInt()),0===(e&=63))return this;var t=this.high;return e<32?i(this.low>>>e|t<<32-e,t>>>e,this.unsigned):i(32===e?t:t>>>e-32,0,this.unsigned)},v.shru=v.shiftRightUnsigned,v.shr_u=v.shiftRightUnsigned,v.toSigned=function(){return this.unsigned?i(this.low,this.high,!1):this},v.toUnsigned=function(){return this.unsigned?this:i(this.low,this.high,!0)},v.toBytes=function(e){return e?this.toBytesLE():this.toBytesBE()},v.toBytesLE=function(){var e=this.high,t=this.low;return[255&t,t>>>8&255,t>>>16&255,t>>>24,255&e,e>>>8&255,e>>>16&255,e>>>24]},v.toBytesBE=function(){var e=this.high,t=this.low;return[e>>>24,e>>>16&255,e>>>8&255,255&e,t>>>24,t>>>16&255,t>>>8&255,255&t]},t.fromBytes=function(e,n,r){return r?t.fromBytesLE(e,n):t.fromBytesBE(e,n)},t.fromBytesLE=function(e,n){return new t(e[0]|e[1]<<8|e[2]<<16|e[3]<<24,e[4]|e[5]<<8|e[6]<<16|e[7]<<24,n)},t.fromBytesBE=function(e,n){return new t(e[4]<<24|e[5]<<16|e[6]<<8|e[7],e[0]<<24|e[1]<<16|e[2]<<8|e[3],n)},Rr}();const Br=e(Fr),zr=Br||n({__proto__:null,default:Br},[Fr]);function Lr(e){return zr.fromString(e,!0,16)}const Pr=Lr("c3a5c85c97cb3127"),Vr=Lr("b492b66fbe98f273"),Ur=Lr("9ae16a3b2f90404f");function jr(e){return e.xor(e.shru(47))}function Wr(e,t,n){const r=e.slice(t,t+n);return zr.fromBytes(Array.from(r),!0,!0)}function Gr(e,t){return Wr(e,t,8)}function qr(e,t){return Wr(e,t,4)}function Kr(e,t){return 0===t?e:e.shru(t).or(e.shl(64-t))}function Hr(e,t,n=Lr("9ddfea08eb382d69")){let r=e.xor(t).mul(n);r=r.xor(r.shru(47));let a=t.xor(r).mul(n);return a=a.xor(a.shru(47)),a=a.mul(n),a}function Zr(e,t,n,r){return function(e,t,n,r,a,s){a=a.add(e),s=Kr(s.add(a).add(r),21);const o=a;return a=(a=a.add(t)).add(n),s=s.add(Kr(a,44)),[a.add(r),s.add(o)]}(Gr(e,t),Gr(e,t+8),Gr(e,t+16),Gr(e,t+24),n,r)}function Jr(e,t=e.length){const n=zr.fromNumber(81,!0);if(t<=32)return t<=16?function(e,t=e.length){if(t>=8){const n=Ur.add(2*t),r=Gr(e,0).add(Ur),a=Gr(e,t-8);return Hr(Kr(a,37).mul(n).add(r),Kr(r,25).add(a).mul(n),n)}if(t>=4){const n=Ur.add(2*t);return Hr(qr(e,0).shl(3).add(t),qr(e,t-4),n)}if(t>0){const n=e[0]+(e[t>>1]<<8),r=t+(e[t-1]<<2);return jr(Ur.mul(n).xor(Pr.mul(r))).mul(Ur)}return Ur}(e,t):function(e,t=e.length){const n=Ur.add(2*t),r=Gr(e,0).mul(Vr),a=Gr(e,8),s=Gr(e,t-8).mul(n),o=Gr(e,t-16).mul(Ur);return Hr(Kr(r.add(a),43).add(Kr(s,30)).add(o),r.add(Kr(a.add(Ur),18)).add(s),n)}(e,t);if(t<=64)return function(e,t=e.length){const n=Ur.add(2*t),r=Gr(e,0).mul(Ur),a=Gr(e,8),s=Gr(e,t-8).mul(n),o=Gr(e,t-16).mul(Ur),i=Kr(r.add(a),43).add(Kr(s,30)).add(o),u=Hr(i,r.add(Kr(a.add(Ur),18)).add(s),n),l=Gr(e,16).mul(n),c=Gr(e,24),p=i.add(Gr(e,t-32)).mul(n),d=u.add(Gr(e,t-24)).mul(n);return Hr(Kr(l.add(c),43).add(Kr(p,30)).add(d),l.add(Kr(c.add(r),18)).add(p),n)}(e,t);let r=n,a=n.mul(Vr).add(113),s=jr(a.mul(Ur).add(113)).mul(Ur),o=[zr.UZERO,zr.UZERO],i=[zr.UZERO,zr.UZERO];r=r.mul(Ur).add(Gr(e,0));let u=0;const l=64*(t-1>>6),c=l+(t-1&63)-63;do{r=Kr(r.add(a).add(o[0]).add(Gr(e,u+8)),37).mul(Vr),a=Kr(a.add(o[1]).add(Gr(e,u+48)),42).mul(Vr),r=r.xor(i[1]),a=a.add(o[0]).add(Gr(e,u+40)),s=Kr(s.add(i[0]),33).mul(Vr),o=Zr(e,u,o[1].mul(Vr),r.add(i[0])),i=Zr(e,u+32,s.add(i[1]),a.add(Gr(e,u+16))),[s,r]=[r,s],u+=64}while(u!==l);const p=Vr.add(s.and(255).shl(1));return u=c,i[0]=i[0].add(t-1&63),o[0]=o[0].add(i[0]),i[0]=i[0].add(o[0]),r=Kr(r.add(a).add(o[0]).add(Gr(e,u+8)),37).mul(p),a=Kr(a.add(o[1]).add(Gr(e,u+48)),42).mul(p),r=r.xor(i[1].mul(9)),a=a.add(o[0].mul(9).add(Gr(e,u+40))),s=Kr(s.add(i[0]),33).mul(p),o=Zr(e,u,o[1].mul(p),r.add(i[0])),i=Zr(e,u+32,s.add(i[1]),a.add(Gr(e,u+16))),[s,r]=[r,s],Hr(Hr(o[0],i[0],p).add(jr(a).mul(Pr)).add(s),Hr(o[1],i[1],p).add(r),p)}
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Xr(e,t){return"string"===t?ta(e):Yr([e],t)}function Yr(e,t){if("string"===t)throw new Error("Cannot convert a string[] to a TypedArray");if(Array.isArray(e)&&(e=aa(e)),X().getBool("DEBUG")&&E(e,t),function(e,t){return e instanceof Float32Array&&"float32"===t||e instanceof Int32Array&&"int32"===t||e instanceof Uint8Array&&"bool"===t}(e,t))return e;if(null==t||"float32"===t||"complex64"===t)return new Float32Array(e);if("int32"===t)return new Int32Array(e);if("bool"===t){const t=new Uint8Array(e.length);for(let n=0;n<t.length;++n)0!==Math.round(e[n])&&(t[n]=1);return t}throw new Error(`Unknown data type ${t}`)}function Qr(){return X().platform.now()}function ea(e,t){return X().platform.fetch(e,t)}function ta(e,t="utf-8"){return t=t||"utf-8",X().platform.encode(e,t)}function na(e,t="utf-8"){return t=t||"utf-8",X().platform.decode(e,t)}function ra(e){return null!=X().platform.isTypedArray?X().platform.isTypedArray(e):Dr(e)}function aa(e,t=[],n=!1){if(null==t&&(t=[]),"boolean"==typeof e||"number"==typeof e||"string"==typeof e||K(e)||null==e||ra(e)&&n)t.push(e);else if(Array.isArray(e)||ra(e))for(let r=0;r<e.length;++r)aa(e[r],t,n);else{let r=-1;for(const t of Object.keys(e))/^([1-9]+[0-9]*|0)$/.test(t)&&(r=Math.max(r,Number(t)));for(let a=0;a<=r;a++)aa(e[a],t,n)}return t}const sa=Object.freeze(Object.defineProperty({__proto__:null,arraysEqual:g,arraysEqualWithNull:f,assert:p,assertNonNegativeIntegerDimensions:W,assertNonNull:h,assertShapesMatch:d,bytesFromStringArray:M,bytesPerElement:A,checkConversionForErrors:E,clamp:i,computeStrides:B,convertBackendValuesAndArrayBuffer:P,createScalarValue:Xr,createShuffledIndices:function(e){const t=new Uint32Array(e);for(let n=0;n<e;++n)t[n]=n;return o(t),t},decodeString:na,distSquared:function(e,t){let n=0;for(let r=0;r<e.length;r++){const a=Number(e[r])-Number(t[r]);n+=a*a}return n},encodeString:ta,fetch:ea,fingerPrint64:Jr,flatten:aa,getArrayFromDType:k,getTypedArrayFromDType:T,hasEncodingLoss:I,hexToLong:Lr,indexToLoc:q,inferDtype:R,inferFromImplicitShape:N,isBoolean:O,isFunction:C,isInt:y,isNumber:D,isPromise:K,isScalarShape:function(e){return 0===e.length},isString:$,isTypedArray:ra,isValidDtype:_,locToIndex:G,makeOnesTypedArray:V,makeZerosNestedTypedArray:j,makeZerosTypedArray:U,nearestDivisor:F,nearestLargerEven:u,now:Qr,parseAxisParam:S,randUniform:function(e,t){const n=Math.random();return t*n+(1-n)*e},repeatedTry:x,rightPad:w,shuffle:o,shuffleCombo:function(e,t){if(e.length!==t.length)throw new Error(`Array sizes must match to be shuffled together First array length was ${e.length}Second array length was ${t.length}`);let n=e.length,r=0;for(;n>0;)r=Math.random()*n|0,n--,l(e,n,r),l(t,n,r)},sizeFromShape:m,sizeToSquarishShape:b,squeezeShape:v,sum:c,swap:l,tanh:function(e){if(null!=Math.tanh)return Math.tanh(e);if(e===1/0)return 1;if(e===-1/0)return-1;{const t=Math.exp(2*e);return(t-1)/(t+1)}},toNestedArray:L,toTypedArray:Yr},Symbol.toStringTag,{value:"Module"}));
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class oa{constructor(e,t){this.backendTimer=e,this.logger=t,null==t&&(this.logger=new ua)}profileKernel(e,t,n){let r;const a=()=>{r=n()};let s;const o=Qr();if(this.backendTimer.timerAvailable())s=this.backendTimer.time(a);else{a();for(const e of r)e.dataSync();s=Promise.resolve({kernelMs:Qr()-o})}if(X().getBool("CHECK_COMPUTATION_FOR_ERRORS"))for(let i=0;i<r.length;i++){const t=r[i];t.data().then(n=>{ia(n,t.dtype,e)})}return{kernelName:e,outputs:r,inputs:t,timeMs:s.then(e=>e.kernelMs),extraInfo:s.then(e=>null!=e.getExtraProfileInfo?e.getExtraProfileInfo():"")}}logKernelProfile(e){const{kernelName:t,outputs:n,timeMs:r,inputs:a,extraInfo:s}=e;n.forEach(e=>{Promise.all([e.data(),r,s]).then(n=>{this.logger.logKernelProfile(t,e,n[0],n[1],a,n[2])})})}}function ia(e,t,n){if("float32"!==t)return!1;for(let r=0;r<e.length;r++){const t=e[r];if(isNaN(t)||!isFinite(t))return!0}return!1}class ua{logKernelProfile(e,t,n,r,a,s){"number"==typeof r?w(`${r}ms`,9):r.error,w(e,25),t.rank,t.size,w(t.shape.toString(),14);let o="";for(const i in a){const e=a[i];if(null!=e){const n=e.shape||t.shape,r=n.length;o+=`${i}: ${r}D ${r>0?n:""} `}}}}
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function la(e,t,n,r){const a=B(t),s=function(e,t,n,r){const a=m(t),s=r[r.length-1],o=new Array(s).fill(0),i=t.length,u="complex64"===n?ha(e):e;if(i>1)for(let l=0;l<a/s;l++){const e=l*s;for(let t=0;t<s;t++)o[t]=Math.max(o[t],ca(u[e+t],0,n).length)}return o}(e,t,n,a),o=t.length,i=da(e,t,n,a,s),u=["Tensor"];return r&&(u.push(`  dtype: ${n}`),u.push(`  rank: ${o}`),u.push(`  shape: [${t}]`),u.push("  values:")),u.push(i.map(e=>"    "+e).join("\n")),u.join("\n")}function ca(e,t,n){let r;return r=Array.isArray(e)?`${parseFloat(e[0].toFixed(7))} + ${parseFloat(e[1].toFixed(7))}j`:$(e)?`'${e}'`:"bool"===n?pa(e):parseFloat(e.toFixed(7)).toString(),w(r,t)}function pa(e){return 0===e?"false":"true"}function da(e,t,n,r,a,s=!0){const o="complex64"===n?2:1,i=t[0],u=t.length;if(0===u){if("complex64"===n){return[ca(ha(e)[0],0,n)]}return"bool"===n?[pa(e[0])]:[e[0].toString()]}if(1===u){if(i>20){const t=3*o;let r=Array.from(e.slice(0,t)),s=Array.from(e.slice((i-3)*o,i*o));return"complex64"===n&&(r=ha(r),s=ha(s)),["["+r.map((e,t)=>ca(e,a[t],n)).join(", ")+", ..., "+s.map((e,t)=>ca(e,a[i-3+t],n)).join(", ")+"]"]}return["["+("complex64"===n?ha(e):Array.from(e)).map((e,t)=>ca(e,a[t],n)).join(", ")+"]"]}const l=t.slice(1),c=r.slice(1),p=r[0]*o,d=[];if(i>20){for(let t=0;t<3;t++){const r=t*p,s=r+p;d.push(...da(e.slice(r,s),l,n,c,a,!1))}d.push("...");for(let t=i-3;t<i;t++){const r=t*p,s=r+p;d.push(...da(e.slice(r,s),l,n,c,a,t===i-1))}}else for(let f=0;f<i;f++){const t=f*p,r=t+p;d.push(...da(e.slice(t,r),l,n,c,a,f===i-1))}const h=2===u?",":"";d[0]="["+(i>0?d[0]+h:"");for(let f=1;f<d.length-1;f++)d[f]=" "+d[f]+h;let m=",\n";for(let f=2;f<u;f++)m+="\n";return d[d.length-1]=" "+d[d.length-1]+"]"+(s?"":m),d}function ha(e){const t=[];for(let n=0;n<e.length;n+=2)t.push([e[n],e[n+1]]);return t}
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class ma{constructor(e,t,n){if(this.dtype=t,this.shape=e.slice(),this.size=m(e),null!=n){const e=n.length;p(e===this.size,()=>`Length of values '${e}' does not match the size inferred by the shape '${this.size}'.`)}if("complex64"===t)throw new Error("complex64 dtype TensorBuffers are not supported. Please create a TensorBuffer for the real and imaginary parts separately and call tf.complex(real, imag).");this.values=n||k(t,this.size),this.strides=B(e)}set(e,...t){0===t.length&&(t=[0]),p(t.length===this.rank,()=>`The number of provided coordinates (${t.length}) must match the rank (${this.rank})`);const n=this.locToIndex(t);this.values[n]=e}get(...e){0===e.length&&(e=[0]);let t=0;for(const r of e){if(r<0||r>=this.shape[t]){const t=`Requested out of range element at ${e}.   Buffer shape=${this.shape}`;throw new Error(t)}t++}let n=e[e.length-1];for(let r=0;r<e.length-1;++r)n+=this.strides[r]*e[r];return this.values[n]}locToIndex(e){if(0===this.rank)return 0;if(1===this.rank)return e[0];let t=e[e.length-1];for(let n=0;n<e.length-1;++n)t+=this.strides[n]*e[n];return t}indexToLoc(e){if(0===this.rank)return[];if(1===this.rank)return[e];const t=new Array(this.shape.length);for(let n=0;n<t.length-1;++n)t[n]=Math.floor(e/this.strides[n]),e-=t[n]*this.strides[n];return t[t.length-1]=e,t}get rank(){return this.shape.length}toTensor(){return fa().makeTensor(this.values,this.shape,this.dtype)}}let fa=null,ga=null;class ya{constructor(e,t,n,r){this.kept=!1,this.isDisposedInternal=!1,this.shape=e.slice(),this.dtype=t||"float32",this.size=m(e),this.strides=B(e),this.dataId=n,this.id=r,this.rankType=this.rank<5?this.rank.toString():"higher"}get rank(){return this.shape.length}async buffer(){const e=await this.data();return ga.buffer(this.shape,this.dtype,e)}bufferSync(){return ga.buffer(this.shape,this.dtype,this.dataSync())}async array(){const e=await this.data();return L(this.shape,e,"complex64"===this.dtype)}arraySync(){return L(this.shape,this.dataSync(),"complex64"===this.dtype)}async data(){this.throwIfDisposed();const e=fa().read(this.dataId);if("string"===this.dtype){const n=await e;try{return n.map(e=>na(e))}catch(t){throw new Error("Failed to decode the string bytes into utf-8. To get the original bytes, call tensor.bytes().")}}return e}dataToGPU(e){return this.throwIfDisposed(),fa().readToGPU(this.dataId,e)}dataSync(){this.throwIfDisposed();const e=fa().readSync(this.dataId);if("string"===this.dtype)try{return e.map(e=>na(e))}catch(t){throw new Error("Failed to decode the string bytes into utf-8. To get the original bytes, call tensor.bytes().")}return e}async bytes(){this.throwIfDisposed();const e=await fa().read(this.dataId);return"string"===this.dtype?e:new Uint8Array(e.buffer)}dispose(){this.isDisposed||(this.kerasMask&&this.kerasMask.dispose(),fa().disposeTensor(this),this.isDisposedInternal=!0)}get isDisposed(){return this.isDisposedInternal}throwIfDisposed(){if(this.isDisposed)throw new Error("Tensor is disposed.")}print(e=!1){return ga.print(this,e)}clone(){return this.throwIfDisposed(),ga.clone(this)}toString(e=!1){return la(this.dataSync(),this.shape,this.dtype,e)}cast(e){return this.throwIfDisposed(),ga.cast(this,e)}variable(e=!0,t,n){return this.throwIfDisposed(),fa().makeVariable(this,e,t,n)}}function ba(){return te("Tensor",()=>ya)}Object.defineProperty(ya,Symbol.hasInstance,{value:e=>!!e&&null!=e.data&&null!=e.dataSync&&null!=e.throwIfDisposed}),ba();class wa extends ya{constructor(e,t,n,r){super(e.shape,e.dtype,e.dataId,r),this.trainable=t,this.name=n}assign(e){if(e.dtype!==this.dtype)throw new Error(`dtype of the new value (${e.dtype}) and previous value (${this.dtype}) must match`);if(!g(e.shape,this.shape))throw new Error(`shape of the new value (${e.shape}) and previous value (${this.shape}) must match`);fa().disposeTensor(this),this.dataId=e.dataId,fa().incRef(this,null)}dispose(){fa().disposeVariable(this),this.isDisposedInternal=!0}}
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
var xa,Na,Sa,va,Ta,ka,Ea,_a,Ia,Aa;Object.defineProperty(wa,Symbol.hasInstance,{value:e=>e instanceof ya&&null!=e.assign&&e.assign instanceof Function}),(Na=xa||(xa={})).R0="R0",Na.R1="R1",Na.R2="R2",Na.R3="R3",Na.R4="R4",Na.R5="R5",Na.R6="R6",(va=Sa||(Sa={})).float32="float32",va.int32="int32",va.bool="int32",va.complex64="complex64",(ka=Ta||(Ta={})).float32="float32",ka.int32="int32",ka.bool="bool",ka.complex64="complex64",(_a=Ea||(Ea={})).float32="float32",_a.int32="float32",_a.bool="float32",_a.complex64="complex64",(Aa=Ia||(Ia={})).float32="complex64",Aa.int32="complex64",Aa.bool="complex64",Aa.complex64="complex64";const Ma={float32:Ea,int32:Sa,bool:Ta,complex64:Ia};function $a(e,t){if("string"===e||"string"===t){if("string"===e&&"string"===t)return"string";throw new Error(`Can not upcast ${e} with ${t}`)}return Ma[e][t]}function Oa(e){return $a(e,"int32")}function Da(e){return null!=e&&"object"==typeof e&&"texture"in e&&e.texture instanceof WebGLTexture}function Ra(e){return"undefined"!=typeof GPUBuffer&&null!=e&&"object"==typeof e&&"buffer"in e&&e.buffer instanceof GPUBuffer}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ca(e,t){if(e.dtype===t.dtype)return[e,t];const n=$a(e.dtype,t.dtype);return[e.cast(n),t.cast(n)]}function Fa(e,t){p(e.dtype===t.dtype,()=>`The dtypes of the first(${e.dtype}) and second(${t.dtype}) input must match`)}function Ba(e,t){return t.some(t=>t.id===e.id)}function za(e){const t=[];return La(e,t,new Set),t}function La(e,t,n){if(null==e)return;if(e instanceof ya)return void t.push(e);if(r=e,!Array.isArray(r)&&"object"!=typeof r)return;var r;const a=e;for(const s in a){const e=a[s];n.has(e)||(n.add(e),La(e,t,n))}}const Pa=Object.freeze(Object.defineProperty({__proto__:null,assertTypesMatch:Fa,getTensorsInContainer:za,isTensorInList:Ba,makeTypesMatch:Ca},Symbol.toStringTag,{value:"Module"}));
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Va(e){return null!=e.kernelName}class Ua{constructor(){this.registeredVariables={},this.nextTapeNodeId=0,this.numBytes=0,this.numTensors=0,this.numStringTensors=0,this.numDataBuffers=0,this.gradientDepth=0,this.kernelDepth=0,this.scopeStack=[],this.numDataMovesStack=[],this.nextScopeId=0,this.tensorInfo=new WeakMap,this.profiling=!1,this.activeProfile={newBytes:0,newTensors:0,peakBytes:0,kernels:[],result:null,get kernelNames(){return Array.from(new Set(this.kernels.map(e=>e.name)))}}}dispose(){for(const e in this.registeredVariables)this.registeredVariables[e].dispose()}}class ja{constructor(e){this.ENV=e,this.registry={},this.registryFactory={},this.pendingBackendInitId=0,this.state=new Ua}async ready(){if(null!=this.pendingBackendInit)return this.pendingBackendInit.then(()=>{});if(null!=this.backendInstance)return;const e=this.getSortedBackends();for(let t=0;t<e.length;t++){const n=e[t];if(await this.initializeBackend(n).success)return void(await this.setBackend(n))}throw new Error("Could not initialize any backends, all backend initializations failed.")}get backend(){if(null!=this.pendingBackendInit)throw new Error(`Backend '${this.backendName}' has not yet been initialized. Make sure to await tf.ready() or await tf.setBackend() before calling other methods`);if(null==this.backendInstance){const{name:e,asyncInit:t}=this.initializeBackendsAndReturnBest();if(t)throw new Error(`The highest priority backend '${e}' has not yet been initialized. Make sure to await tf.ready() or await tf.setBackend() before calling other methods`);this.setBackend(e)}return this.backendInstance}backendNames(){return Object.keys(this.registryFactory)}findBackend(e){if(!(e in this.registry)){if(!(e in this.registryFactory))return null;{const{asyncInit:t}=this.initializeBackend(e);if(t)return null}}return this.registry[e]}findBackendFactory(e){return e in this.registryFactory?this.registryFactory[e].factory:null}registerBackend(e,t,n=1){return e in this.registryFactory?(Nr(),!1):(this.registryFactory[e]={factory:t,priority:n},!0)}async setBackend(e){if(null==this.registryFactory[e])throw new Error(`Backend name '${e}' not found in registry`);if(this.backendName=e,null==this.registry[e]){this.backendInstance=null;const{success:t,asyncInit:n}=this.initializeBackend(e);if(!(n?await t:t))return!1}return this.backendInstance=this.registry[e],this.setupRegisteredKernels(),this.profiler=new oa(this.backendInstance),!0}setupRegisteredKernels(){Er(this.backendName).forEach(e=>{null!=e.setupFunc&&e.setupFunc(this.backendInstance)})}disposeRegisteredKernels(e){Er(e).forEach(t=>{null!=t.disposeFunc&&t.disposeFunc(this.registry[e])})}initializeBackend(e){const t=this.registryFactory[e];if(null==t)throw new Error(`Cannot initialize backend ${e}, no registration found.`);try{const n=t.factory();if(!n||n instanceof a||"function"!=typeof n.then)return this.registry[e]=n,{success:!0,asyncInit:!1};{const t=++this.pendingBackendInitId,r=n.then(n=>!(t<this.pendingBackendInitId)&&(this.registry[e]=n,this.pendingBackendInit=null,!0)).catch(e=>(t<this.pendingBackendInitId||(this.pendingBackendInit=null,Nr(),Nr(e.stack||e.message)),!1));return this.pendingBackendInit=r,{success:r,asyncInit:!0}}}catch(n){return Nr(),Nr(n.stack||n.message),{success:!1,asyncInit:!1}}}removeBackend(e){if(!(e in this.registryFactory))throw new Error(`${e} backend not found in registry`);this.backendName===e&&null!=this.pendingBackendInit&&this.pendingBackendInitId++,e in this.registry&&(this.disposeRegisteredKernels(e),this.registry[e].dispose(),delete this.registry[e]),delete this.registryFactory[e],this.backendName===e&&(this.pendingBackendInit=null,this.backendName=null,this.backendInstance=null)}getSortedBackends(){if(0===Object.keys(this.registryFactory).length)throw new Error("No backend found in registry.");return Object.keys(this.registryFactory).sort((e,t)=>this.registryFactory[t].priority-this.registryFactory[e].priority)}initializeBackendsAndReturnBest(){const e=this.getSortedBackends();for(let t=0;t<e.length;t++){const n=e[t],{success:r,asyncInit:a}=this.initializeBackend(n);if(a||r)return{name:n,asyncInit:a}}throw new Error("Could not initialize any backends, all backend initializations failed.")}moveData(e,t){const n=this.state.tensorInfo.get(t),r=n.backend,a=this.readSync(t),s=r.refCount(t);r.disposeData(t,!0),n.backend=e,e.move(t,a,n.shape,n.dtype,s),this.shouldCheckForMemLeaks()&&this.state.numDataMovesStack[this.state.numDataMovesStack.length-1]++}tidy(e,t){let n,r=null;if(null==t){if("function"!=typeof e)throw new Error("Please provide a function to tidy()");t=e}else{if("string"!=typeof e&&!(e instanceof String))throw new Error("When calling with two arguments, the first argument to tidy() must be a string");if("function"!=typeof t)throw new Error("When calling with two arguments, the 2nd argument to tidy() must be a function");r=e}return this.scopedRun(()=>this.startScope(r),()=>this.endScope(n),()=>(n=t(),n))}scopedRun(e,t,n){e();try{const e=n();return t(),e}catch(r){throw t(),r}}nextTensorId(){return ja.nextTensorId++}nextVariableId(){return ja.nextVariableId++}clone(e){const t=Ga.runKernel(bt,{x:e}),n={x:e};return this.addTapeNode(this.state.activeScope.name,n,[t],e=>({x:()=>{const t={x:e},n={dtype:"float32"};return Ga.runKernel(Ee,t,n)}}),[],{}),t}runKernel(e,t,n){null==this.backendName&&this.backend;if(!(null!=Tr(e,this.backendName)))throw new Error(`Kernel '${e}' not registered for backend '${this.backendName}'`);return this.runKernelFunc({kernelName:e,inputs:t,attrs:n})}shouldCheckForMemLeaks(){return this.ENV.getBool("IS_TEST")}checkKernelForMemLeak(e,t,n){const r=this.backend.numDataIds();let a=0;n.forEach(e=>{a+="complex64"===e.dtype?3:1});const s=this.state.numDataMovesStack[this.state.numDataMovesStack.length-1],o=r-t-a-s;if(o>0)throw new Error(`Backend '${this.backendName}' has an internal memory leak (${o} data ids) after running '${e}'`)}runKernelFunc(e){let t,n=[];const r=this.isTapeOn(),a=this.state.numBytes,s=this.state.numTensors;let o,i;this.shouldCheckForMemLeaks()&&this.state.numDataMovesStack.push(0),null==this.backendName&&this.backend;const u=Va(e)?e.kernelName:null!=this.state.activeScope?this.state.activeScope.name:"";if(Va(e)){const{kernelName:t,inputs:a,attrs:s}=e;null==this.backendName&&this.backend;const u=Tr(t,this.backendName);p(null!=u,()=>`Cannot find registered kernel '${t}' for backend '${this.backendName}'`),o=()=>{const e=this.backend.numDataIds();i=u.kernelFunc({inputs:a,attrs:s,backend:this.backend});const o=Array.isArray(i)?i:[i];this.shouldCheckForMemLeaks()&&this.checkKernelForMemLeak(t,e,o);const l=o.map(e=>null!=e.rank?e:this.makeTensorFromTensorInfo(e));if(r){const e=this.getTensorsForGradient(t,a,l);n=this.saveTensorsForBackwardMode(e)}return l}}else{const{forwardFunc:t}=e,a=e=>{r&&(n=e.map(e=>this.keep(this.clone(e))))};o=()=>{const e=this.backend.numDataIds();i=this.tidy(()=>t(this.backend,a));const n=Array.isArray(i)?i:[i];return this.shouldCheckForMemLeaks()&&this.checkKernelForMemLeak(u,e,n),n}}const{inputs:l,attrs:c}=e,d=Va(e)?null:e.backwardsFunc;let h;return this.scopedRun(()=>this.state.kernelDepth++,()=>this.state.kernelDepth--,()=>{this.ENV.getBool("DEBUG")||this.state.profiling?(h=this.profiler.profileKernel(u,l,()=>o()),this.ENV.getBool("DEBUG")&&this.profiler.logKernelProfile(h),t=h.outputs):t=o()}),r&&this.addTapeNode(u,l,t,d,n,c),this.state.profiling&&this.state.activeProfile.kernels.push({name:u,bytesAdded:this.state.numBytes-a,totalBytesSnapshot:this.state.numBytes,tensorsAdded:this.state.numTensors-s,totalTensorsSnapshot:this.state.numTensors,inputShapes:Object.keys(l).map(e=>null!=l[e]?l[e].shape:null),outputShapes:t.map(e=>e.shape),kernelTimeMs:h.timeMs,extraInfo:h.extraInfo}),Array.isArray(i)?t:t[0]}saveTensorsForBackwardMode(e){return e.map(e=>this.keep(this.clone(e)))}getTensorsForGradient(e,t,n){const r=kr(e);if(null!=r){const e=r.inputsToSave||[],a=r.outputsToSave||[];let s;r.saveAllInputs?(p(Array.isArray(t),()=>"saveAllInputs is true, expected inputs to be an array."),s=Object.keys(t).map(e=>t[e])):s=e.map(e=>t[e]);const o=n.filter((e,t)=>a[t]);return s.concat(o)}return[]}makeTensor(e,t,n,r){if(null==e)throw new Error("Values passed to engine.makeTensor() are null");n=n||"float32",r=r||this.backend;let a=e;"string"===n&&$(e[0])&&(a=e.map(e=>ta(e)));const s=r.write(a,t,n),o=new ya(t,n,s,this.nextTensorId());if(this.trackTensor(o,r),"string"===n){const e=this.state.tensorInfo.get(s),t=M(a);this.state.numBytes+=t-e.bytes,e.bytes=t}return o}makeTensorFromDataId(e,t,n,r){const a={dataId:e,shape:t,dtype:n=n||"float32"};return this.makeTensorFromTensorInfo(a,r)}makeTensorFromTensorInfo(e,t){const{dataId:n,shape:r,dtype:a}=e,s=new ya(r,a,n,this.nextTensorId());return this.trackTensor(s,t),s}makeVariable(e,t=!0,n,r){n=n||this.nextVariableId().toString(),null!=r&&r!==e.dtype&&(e=e.cast(r));const a=new wa(e,t,n,this.nextTensorId());if(null!=this.state.registeredVariables[a.name])throw new Error(`Variable with name ${a.name} was already registered`);return this.state.registeredVariables[a.name]=a,this.incRef(a,this.backend),a}trackTensor(e,t){this.state.numTensors++,"string"===e.dtype&&this.state.numStringTensors++;let n=0;"complex64"!==e.dtype&&"string"!==e.dtype&&(n=e.size*A(e.dtype)),this.state.numBytes+=n,this.state.tensorInfo.has(e.dataId)||(this.state.numDataBuffers++,this.state.tensorInfo.set(e.dataId,{backend:t||this.backend,dtype:e.dtype,shape:e.shape,bytes:n})),e instanceof wa||this.track(e)}incRef(e,t){this.trackTensor(e,t),this.backend.incRef(e.dataId)}removeDataId(e,t){this.state.tensorInfo.has(e)&&this.state.tensorInfo.get(e).backend===t&&(this.state.tensorInfo.delete(e),this.state.numDataBuffers--)}disposeTensor(e){if(!this.state.tensorInfo.has(e.dataId))return;const t=this.state.tensorInfo.get(e.dataId);if(this.state.numTensors--,"string"===e.dtype&&(this.state.numStringTensors--,this.state.numBytes-=t.bytes),"complex64"!==e.dtype&&"string"!==e.dtype){const t=e.size*A(e.dtype);this.state.numBytes-=t}t.backend.disposeData(e.dataId)&&this.removeDataId(e.dataId,t.backend)}disposeVariables(){for(const e in this.state.registeredVariables){const t=this.state.registeredVariables[e];this.disposeVariable(t)}}disposeVariable(e){this.disposeTensor(e),null!=this.state.registeredVariables[e.name]&&delete this.state.registeredVariables[e.name]}memory(){const e=this.backend.memory();return e.numTensors=this.state.numTensors,e.numDataBuffers=this.state.numDataBuffers,e.numBytes=this.state.numBytes,this.state.numStringTensors>0&&(e.unreliable=!0,null==e.reasons&&(e.reasons=[]),e.reasons.push("Memory usage by string tensors is approximate (2 bytes per character)")),e}async profile(e){this.state.profiling=!0;const t=this.state.numBytes,n=this.state.numTensors;this.state.activeProfile.kernels=[],this.state.activeProfile.result=await e(),this.state.profiling=!1,this.state.activeProfile.peakBytes=Math.max(...this.state.activeProfile.kernels.map(e=>e.totalBytesSnapshot)),this.state.activeProfile.newBytes=this.state.numBytes-t,this.state.activeProfile.newTensors=this.state.numTensors-n;for(const r of this.state.activeProfile.kernels)r.kernelTimeMs=await r.kernelTimeMs,r.extraInfo=await r.extraInfo;return this.state.activeProfile}isTapeOn(){return this.state.gradientDepth>0&&0===this.state.kernelDepth}addTapeNode(e,t,n,r,a,s){const o={id:this.state.nextTapeNodeId++,kernelName:e,inputs:t,outputs:n,saved:a},i=kr(e);null!=i&&(r=i.gradFunc),null!=r&&(o.gradient=e=>(e=e.map((e,t)=>{if(null==e){const e=n[t],r=U(e.size,e.dtype);return this.makeTensor(r,e.shape,e.dtype)}return e}),r(e.length>1?e:e[0],a,s))),this.state.activeTape.push(o)}keep(e){return e.kept=!0,e}startTape(){0===this.state.gradientDepth&&(this.state.activeTape=[]),this.state.gradientDepth++}endTape(){this.state.gradientDepth--}startScope(e){const t={track:[],name:"unnamed scope",id:this.state.nextScopeId++};e&&(t.name=e),this.state.scopeStack.push(t),this.state.activeScope=t}endScope(e){const t=za(e),n=new Set(t.map(e=>e.id));for(let a=0;a<this.state.activeScope.track.length;a++){const e=this.state.activeScope.track[a];e.kept||n.has(e.id)||e.dispose()}const r=this.state.scopeStack.pop();this.state.activeScope=0===this.state.scopeStack.length?null:this.state.scopeStack[this.state.scopeStack.length-1],t.forEach(e=>{e.kept||e.scopeId!==r.id||this.track(e)})}gradients(e,t,n,r=!1){if(p(t.length>0,()=>"gradients() received an empty list of xs."),null!=n&&"float32"!==n.dtype)throw new Error(`dy must have 'float32' dtype, but has '${n.dtype}'`);const a=this.scopedRun(()=>this.startTape(),()=>this.endTape(),()=>this.tidy("forward",e));p(a instanceof ya,()=>"The result y returned by f() must be a tensor.");const s=function(e,t,n){const r={},a={};for(let u=0;u<t.length;u++)r[t[u].id]=!0;for(let u=0;u<e.length;u++){const n=e[u],s=n.inputs;for(const e in s){const o=s[e];let i=!1;for(let e=0;e<t.length;e++)if(r[o.id]){n.outputs.forEach(e=>r[e.id]=!0),i=!0,a[n.id]=!0;break}if(i)break}}const s={};s[n.id]=!0;const o={};for(let u=e.length-1;u>=0;u--){const t=e[u],n=t.inputs;for(let e=0;e<t.outputs.length;e++)if(s[t.outputs[e].id]){for(const e in n)s[n[e].id]=!0,o[t.id]=!0;break}}const i=[];for(let u=0;u<e.length;u++){const t=e[u];if(a[t.id]&&o[t.id]){const e={};for(const a in t.inputs){const n=t.inputs[a];r[n.id]&&(e[a]=n)}const n=Object.assign({},t);n.inputs=e,n.outputs=t.outputs,i.push(n)}}return i}(this.state.activeTape,t,a);if(!r&&0===s.length&&t.length>0)throw new Error("Cannot compute gradient of y=f(x) with respect to x. Make sure that the f you passed encloses all operations that lead from x to y.");return this.tidy("backward",()=>{const e={};e[a.id]=null==n?function(e){const t=V(m(e),"float32");return Ga.makeTensor(t,e,"float32")}(a.shape):n,function(e,t,n,r){for(let a=t.length-1;a>=0;a--){const s=t[a],o=[];if(s.outputs.forEach(t=>{const n=e[t.id];null!=n?o.push(n):o.push(null)}),null==s.gradient)throw new Error(`Cannot compute gradient: gradient function not found for ${s.kernelName}.`);const i=s.gradient(o);for(const t in s.inputs){if(!(t in i))throw new Error(`Cannot backprop through input ${t}. Available gradients found: ${Object.keys(i)}.`);const a=n(()=>i[t]());if("float32"!==a.dtype)throw new Error(`Error in gradient for op ${s.kernelName}. The gradient of input ${t} must have 'float32' dtype, but has '${a.dtype}'`);const o=s.inputs[t];if(!g(a.shape,o.shape))throw new Error(`Error in gradient for op ${s.kernelName}. The gradient of input '${t}' has shape '${a.shape}', which does not match the shape of the input '${o.shape}'`);if(null==e[o.id])e[o.id]=a;else{const t=e[o.id];e[o.id]=r(t,a),t.dispose()}}}}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */(e,s,e=>this.tidy(e),qa);const r=t.map(t=>e[t.id]);return 0===this.state.gradientDepth&&(this.state.activeTape.forEach(e=>{for(const t of e.saved)t.dispose()}),this.state.activeTape=null),{value:a,grads:r}})}customGrad(e){return p(C(e),()=>"The f passed in customGrad(f) must be a function."),(...t)=>{let n;p(t.every(e=>e instanceof ya),()=>"The args passed in customGrad(f)(x1, x2,...) must all be tensors");const r={};t.forEach((e,t)=>{r[t]=e});return this.runKernelFunc({forwardFunc:(r,a)=>(n=e(...t,a),p(n.value instanceof ya,()=>"The function f passed in customGrad(f) must return an object where `obj.value` is a tensor"),p(C(n.gradFunc),()=>"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function."),n.value),backwardsFunc:(e,r)=>{const a=n.gradFunc(e,r),s=Array.isArray(a)?a:[a];p(s.length===t.length,()=>"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function that returns the same number of tensors as inputs passed to f(...)."),p(s.every(e=>e instanceof ya),()=>"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function that returns a list of only tensors.");const o={};return s.forEach((e,t)=>{o[t]=()=>e}),o},inputs:r})}}readSync(e){return this.state.tensorInfo.get(e).backend.readSync(e)}read(e){return this.state.tensorInfo.get(e).backend.read(e)}readToGPU(e,t){return this.state.tensorInfo.get(e).backend.readToGPU(e,t)}async time(e){const t=Qr(),n=await this.backend.time(e);return n.wallMs=Qr()-t,n}track(e){return null!=this.state.activeScope&&(e.scopeId=this.state.activeScope.id,this.state.activeScope.track.push(e)),e}get registeredVariables(){return this.state.registeredVariables}reset(){this.pendingBackendInitId++,this.state.dispose(),this.ENV.reset(),this.state=new Ua;for(const e in this.registry)this.disposeRegisteredKernels(e),this.registry[e].dispose(),delete this.registry[e];this.backendName=null,this.backendInstance=null,this.pendingBackendInit=null}}function Wa(){const e=ee();if(null==e._tfengine){const t=new Z(e);e._tfengine=new ja(t)}var t;
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */return t=e._tfengine.ENV,Q=t,fa=()=>e._tfengine,e._tfengine}ja.nextTensorId=0,ja.nextVariableId=0;const Ga=Wa();function qa(e,t){const n={a:e,b:t};return Ga.runKernel(se,n)}
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let Ka;function Ha(e){if(void 0!==Ka)return Ka;if(e||"undefined"!=typeof navigator&&null!=navigator){if(e||(e=navigator),"ReactNative"===e.product)return!0;const t=e.userAgent||e.vendor||("undefined"!=typeof window?window.opera:"");if(!t){const t=e;return t.userAgentData&&t.userAgentData.mobile}return/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(t)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0,4))}return!1}function Za(){return"undefined"!=typeof window&&null!=window.document||"undefined"!=typeof WorkerGlobalScope}const Ja=Object.freeze(Object.defineProperty({__proto__:null,isBrowser:Za,isMobile:Ha,mockIsMobile:function(e){Ka=e}},Symbol.toStringTag,{value:"Module"})),Xa=X();
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function Ya(e,t){let n=e;if(ra(e))return"string"===t?[]:[e.length];if(Da(e)){const t=e.channels||"RGBA";return[e.height,e.width*t.length]}if(Ra(e))return[e.buffer.size/(null==t?4:A(t))];if(!Array.isArray(e))return[];const r=[];for(;Array.isArray(n)||ra(n)&&"string"!==t;)r.push(n.length),n=n[0];return Array.isArray(e)&&X().getBool("TENSORLIKE_CHECK_SHAPE_CONSISTENCY")&&Qa(e,r,[]),r}function Qa(e,t,n){if(n=n||[],!Array.isArray(e)&&!ra(e))return void p(0===t.length,()=>`Element arr[${n.join("][")}] is a primitive, but should be an array/TypedArray of ${t[0]} elements`);p(t.length>0,()=>`Element arr[${n.join("][")}] should be a primitive, but is an array of ${e.length} elements`),p(e.length===t[0],()=>`Element arr[${n.join("][")}] should have ${t[0]} elements, but has ${e.length} elements`);const r=t.slice(1);for(let a=0;a<e.length;++a)Qa(e[a],r,n.concat(a))}function es(e,t,n,r){if("string_or_numeric"!==e){if(null==e)throw new Error("Expected dtype cannot be null.");if("numeric"!==e&&e!==t||"numeric"===e&&"string"===t)throw new Error(`Argument '${n}' passed to '${r}' must be ${e} tensor, but got ${t} tensor`)}}function ts(e,t,n,r="numeric"){if(e instanceof ba())return es(r,e.dtype,t,n),e;let a=R(e);if("string"!==a&&["bool","int32","float32"].indexOf(r)>=0&&(a=r),es(r,a,t,n),null==e||!ra(e)&&!Array.isArray(e)&&"number"!=typeof e&&"boolean"!=typeof e&&"string"!=typeof e){const r=null==e?"null":e.constructor.name;throw new Error(`Argument '${t}' passed to '${n}' must be a Tensor or TensorLike, but got '${r}'`)}const s=Ya(e,a);ra(e)||Array.isArray(e)||(e=[e]);const o="string"!==a?Yr(e,a):aa(e,[],!0);return Ga.makeTensor(o,s,a)}function ns(e,t,n,r="numeric"){if(!Array.isArray(e))throw new Error(`Argument ${t} passed to ${n} must be a \`Tensor[]\` or \`TensorLike[]\``);return e.map((e,a)=>ts(e,`${t}[${a}]`,n,r))}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */Xa.registerFlag("DEBUG",()=>!1,e=>{}),Xa.registerFlag("IS_BROWSER",()=>Za()),Xa.registerFlag("IS_NODE",()=>"undefined"!=typeof process&&void 0!==process.versions&&void 0!==process.versions.node),Xa.registerFlag("IS_CHROME",()=>"undefined"!=typeof navigator&&null!=navigator&&null!=navigator.userAgent&&/Chrome/.test(navigator.userAgent)&&/Google Inc/.test(navigator.vendor)),Xa.registerFlag("IS_SAFARI",()=>"undefined"!=typeof navigator&&null!=navigator&&null!=navigator.userAgent&&/Safari/.test(navigator.userAgent)&&/Apple/.test(navigator.vendor)),Xa.registerFlag("PROD",()=>!1),Xa.registerFlag("TENSORLIKE_CHECK_SHAPE_CONSISTENCY",()=>Xa.getBool("DEBUG")),Xa.registerFlag("DEPRECATION_WARNINGS_ENABLED",()=>!0),Xa.registerFlag("IS_TEST",()=>!1),Xa.registerFlag("CHECK_COMPUTATION_FOR_ERRORS",()=>Xa.getBool("DEBUG")),Xa.registerFlag("WRAP_TO_IMAGEBITMAP",()=>!1),Xa.registerFlag("CANVAS2D_WILL_READ_FREQUENTLY_FOR_GPU",()=>!1),Xa.registerFlag("USE_SETTIMEOUTCUSTOM",()=>!1);const rs="__op";function as(e){const t=Object.keys(e);if(1!==t.length)throw new Error(`Please provide an object with a single key (operation name) mapping to a function. Got an object with ${t.length} keys.`);let n=t[0];const r=e[n];n.endsWith("_")&&(n=n.substring(0,n.length-1)),n+=rs;const a=(...e)=>{Ga.startScope(n);try{const t=r(...e);return K(t),Ga.endScope(t),t}catch(t){throw Ga.endScope(null),t}};return Object.defineProperty(a,"name",{value:n,configurable:!0}),a}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const ss=as({complex_:function(e,t){const n=ts(e,"real","complex"),r=ts(t,"imag","complex");d(n.shape,r.shape,`real and imag shapes, ${n.shape} and ${r.shape}, must match in call to tf.complex().`);const a={real:n,imag:r};return Ga.runKernel(Ae,a)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function os(e,t,n,r){if(null==r)r=R(e);else if("complex64"===r)throw new Error("Cannot construct a complex64 tensor directly. Please use tf.complex(real, imag).");if(Ra(e)||Da(e)){if("float32"!==r&&"int32"!==r)throw new Error(`Creating tensor from GPU data only supports 'float32'|'int32' dtype, while the dtype is ${r}.`);return Ga.backend.createTensorFromGPUData(e,t||n,r)}if(!ra(e)&&!Array.isArray(e)&&"number"!=typeof e&&"boolean"!=typeof e&&"string"!=typeof e)throw new Error("values passed to tensor(values) must be a number/boolean/string or an array of numbers/booleans/strings, or a TypedArray");if(null!=t){W(t);const e=m(t),r=m(n);p(e===r,()=>`Based on the provided shape, [${t}], the tensor should have ${e} values but has ${r}`);for(let a=0;a<n.length;++a){const e=n[a],r=a!==n.length-1||e!==m(t.slice(a));p(n[a]===t[a]||!r,()=>`Error creating a new Tensor. Inferred shape (${n}) does not match the provided shape (${t}). `)}}return ra(e)||Array.isArray(e)||(e=[e]),t=t||n,e="string"!==r?Yr(e,r):aa(e,[],!0),Ga.makeTensor(e,t,r)}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function is(e,t,n){return os(e,t,Ya(e,n),n)}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const us={float32:4,float16:2,int32:4,uint16:2,uint8:1,bool:1,complex64:8};class ls{static join(e){return new ls(e).slice()}constructor(e){if(this.shards=[],this.previousShardIndex=0,null==e)return;if(e instanceof Array||(e=[e]),0===(e=e.map(e=>ra(e)?e.buffer:e)).length)return;this.bufferUniformSize=e[0].byteLength;let t=0;for(let n=0;n<e.length;n++){const r=e[n];n!==e.length-1&&r.byteLength!==this.bufferUniformSize&&(this.bufferUniformSize=void 0);const a=t+r.byteLength;this.shards.push({buffer:r,start:t,end:a}),t=a}0===this.shards.length&&(this.byteLength=0),this.byteLength=this.shards[this.shards.length-1].end}slice(e=0,t=this.byteLength){if(0===this.shards.length)return new ArrayBuffer(0);if(e=isNaN(Number(e))?0:e,t=isNaN(Number(t))?0:t,e=Math.max(0,e),(t=Math.min(this.byteLength,t))<=e)return new ArrayBuffer(0);const n=this.findShardForByte(e);if(-1===n)throw new Error(`Could not find start shard for byte ${e}`);const r=new ArrayBuffer(t-e),a=new Uint8Array(r);let s=0;for(let o=n;o<this.shards.length;o++){const n=this.shards[o],r=e+s-n.start,i=s,u=Math.min(t,n.end)-n.start,l=new Uint8Array(n.buffer,r,u-r);if(a.set(l,i),s+=l.length,t<n.end)break}return r}findShardForByte(e){if(0===this.shards.length||e<0||e>=this.byteLength)return-1;if(null!=this.bufferUniformSize)return this.previousShardIndex=Math.floor(e/this.bufferUniformSize),this.previousShardIndex;function t(t){return e<t.start?-1:e>=t.end?1:0}if(0===t(this.shards[this.previousShardIndex]))return this.previousShardIndex;const n=function(e,t){let n=0,r=e.length;for(;n<=r;){const a=Math.floor((r-n)/2)+n,s=t(e[a]);if(0===s)return a;s<0?r=a:n=a+1}return-1}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */(this.shards,t);return-1===n?-1:(this.previousShardIndex=n,this.previousShardIndex)}}function cs(){X().set("PROD",!0)}function ps(){X().set("DEBUG",!0)}function ds(){X().set("DEPRECATION_WARNINGS_ENABLED",!1)}function hs(e){X().getBool("DEPRECATION_WARNINGS_ENABLED")}function ms(){Ga.disposeVariables()}function fs(){return Ga}function gs(){return Ga.memory()}function ys(e){return Ga.profile(e)}function bs(e,t){return Ga.tidy(e,t)}function ws(e){za(e).forEach(e=>e.dispose())}function xs(e){return Ga.keep(e)}function Ns(e){return Ga.time(e)}function Ss(e){return Ga.setBackend(e)}function vs(){return Ga.ready()}function Ts(){return Ga.backendName}function ks(e){Ga.removeBackend(e)}function Es(e){return Ga.findBackend(e)}function _s(e){return Ga.findBackendFactory(e)}function Is(e,t,n=1){return Ga.registerBackend(e,t,n)}function As(){return Ga.backend}function Ms(e,t){X().setPlatform(e,t)}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */async function $s(e,t){const n=[],r=[],a=Array.isArray(e)?e.map(e=>e.name):Object.keys(e);for(let s=0;s<a.length;++s){const o=a[s],i=Array.isArray(e)?e[s].tensor:e[o];if("float32"!==i.dtype&&"int32"!==i.dtype&&"bool"!==i.dtype&&"string"!==i.dtype&&"complex64"!==i.dtype)throw new Error(`Unsupported dtype in weight '${o}': ${i.dtype}`);const u={name:o,shape:i.shape,dtype:i.dtype};if("string"===i.dtype){const e=new Promise(async e=>{const t=await i.bytes(),n=t.reduce((e,t)=>e+t.length,0)+4*t.length,r=new Uint8Array(n);let a=0;for(let s=0;s<t.length;s++){const e=t[s],n=new Uint8Array(new Uint32Array([e.length]).buffer);r.set(n,a),a+=4,r.set(e,a),a+=e.length}e(r)});r.push(e)}else r.push(i.data());null!=t&&(u.group=t),n.push(u)}return{data:zs(await Promise.all(r)),specs:n}}function Os(e,t){const n=new ls(e),r={};let a=0;for(const s of t){const e=Ds(s,(e,t)=>n.slice(a+e,a+t));r[s.name]=Cs(s,n.slice(a,a+e)),a+=e}return r}function Ds(e,t){const n=m(e.shape);let r;if("quantization"in e){const t=e.quantization;r=us[t.dtype]}else{if("string"===e.dtype){let e=0;for(let r=0;r<n;r++)e+=4+new Uint32Array(t(e,e+4))[0];return e}r=us[e.dtype]}return n*r}async function Rs(e,t){const n=m(e.shape);let r;if("quantization"in e){const t=e.quantization;r=us[t.dtype]}else{if("string"===e.dtype){let e=0;for(let r=0;r<n;r++)e+=4+new Uint32Array(await t(e,e+4))[0];return e}r=us[e.dtype]}return n*r}function Cs(e,t){const n=e.name,r=e.dtype,a=e.shape,s=m(a);let o,i=0;if("quantization"in e){const a=e.quantization;if("uint8"===a.dtype||"uint16"===a.dtype){if(!("min"in a)||!("scale"in a))throw new Error(`Weight ${e.name} with quantization ${a.dtype} doesn't have corresponding metadata min and scale.`)}else{if("float16"!==a.dtype)throw new Error(`Weight ${e.name} has unknown quantization dtype ${a.dtype}. Supported quantization dtypes are: 'uint8', 'uint16', and 'float16'.`);if("float32"!==r)throw new Error(`Weight ${e.name} is quantized with ${a.dtype} which only supports weights of type float32 not ${r}.`)}const u=us[a.dtype],l="uint8"===a.dtype?new Uint8Array(t):new Uint16Array(t);if("float32"===r)if("uint8"===a.dtype||"uint16"===a.dtype){o=new Float32Array(l.length);for(let e=0;e<l.length;e++){const t=l[e];o[e]=t*a.scale+a.min}}else{if("float16"!==a.dtype)throw new Error(`Unsupported quantization type ${a.dtype} for weight type float32.`);{const e=function(){const e=function(){const e=e=>{let t=e<<13,n=0;for(;!(8388608&t);)n-=8388608,t<<=1;return t&=-8388609,n+=947912704,t|n},t=new Uint32Array(2048);t[0]=0;for(let n=1;n<1024;n++)t[n]=e(n);for(let n=1024;n<2048;n++)t[n]=939524096+(n-1024<<13);return t}(),t=function(){const e=new Uint32Array(64);e[0]=0,e[31]=1199570944,e[32]=2147483648,e[63]=3347054592;for(let t=1;t<31;t++)e[t]=t<<23;for(let t=33;t<63;t++)e[t]=2147483648+(t-32<<23);return e}(),n=function(){const e=new Uint32Array(64);for(let t=0;t<64;t++)e[t]=1024;return e[0]=e[32]=0,e}();return r=>{const a=new ArrayBuffer(4*r.length),s=new Uint32Array(a);for(let o=0;o<r.length;o++){const a=r[o],i=e[n[a>>10]+(1023&a)]+t[a>>10];s[o]=i}return new Float32Array(a)}}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */();o=e(l)}}else{if("int32"!==r)throw new Error(`Unsupported dtype in weight '${n}': ${r}`);if("uint8"!==a.dtype&&"uint16"!==a.dtype)throw new Error(`Unsupported quantization type ${a.dtype} for weight type int32.`);o=new Int32Array(l.length);for(let e=0;e<l.length;e++){const t=l[e];o[e]=Math.round(t*a.scale+a.min)}}i+=s*u}else if("string"===r){const n=m(e.shape);o=[];for(let e=0;e<n;e++){const e=new Uint32Array(t.slice(i,i+4))[0];i+=4;const n=new Uint8Array(t.slice(i,i+e));o.push(n),i+=e}}else{const e=us[r];if("float32"===r)o=new Float32Array(t);else if("int32"===r)o=new Int32Array(t);else{if("bool"!==r){if("complex64"===r){o=new Float32Array(t);const e=new Float32Array(o.length/2),n=new Float32Array(o.length/2);for(let t=0;t<e.length;t++)e[t]=o[2*t],n[t]=o[2*t+1];const r=is(e,a,"float32"),s=is(n,a,"float32"),i=ss(r,s);return r.dispose(),s.dispose(),i}throw new Error(`Unsupported dtype in weight '${n}': ${r}`)}o=new Uint8Array(t)}i+=s*e}return is(o,a,r)}async function Fs(e,t,n){let r=new Uint8Array(t);for(;r.byteLength<n;){const{done:t,value:a}=await e.read();if(t&&null==a){const e=n-r.byteLength;throw new Error(`Reader is done but ${e} bytes are still expected`)}const s=new Uint8Array(r.length+a.byteLength);s.set(r,0),s.set(new Uint8Array(a),r.length),r=s}return r.buffer}async function Bs(e,t){const n={},r=e.getReader();let a=new ArrayBuffer(0);for(const s of t){const e=await Rs(s,async(e,t)=>(a=await Fs(r,a,t),a.slice(e,t)));a=await Fs(r,a,e);const t=a.slice(0,e);a=a.slice(e);const o=Cs(s,t);if(n[s.name]=o,"webgpu"===Ts()){const e=As();"uploadToGPU"in e&&m(o.shape)>=X().get("WEBGPU_CPU_HANDOFF_SIZE_THRESHOLD")&&e.uploadToGPU(o.dataId)}}return n}function zs(e){if(null===e)throw new Error(`Invalid input value: ${JSON.stringify(e)}`);let t=0;const n=[];e.forEach(e=>{if(t+=e.byteLength,n.push(e.byteLength===e.buffer.byteLength?e:new e.constructor(e)),!(e instanceof Float32Array||e instanceof Int32Array||e instanceof Uint8Array))throw new Error(`Unsupported TypedArray subtype: ${e.constructor.name}`)});const r=new Uint8Array(t);let a=0;return n.forEach(e=>{r.set(new Uint8Array(e.buffer),a),a+=e.byteLength}),r.buffer}const Ls="undefined"!=typeof Buffer&&("undefined"==typeof Blob||"undefined"==typeof atob||"undefined"==typeof btoa);function Ps(e){return Ls?Buffer.byteLength(e,"utf8"):new Blob([e]).size}function Vs(e){return ls.join(e)}function Us(e){for(e=e.trim();e.endsWith("/");)e=e.slice(0,e.length-1);const t=e.split("/");return t[t.length-1]}function js(e,t){const n={modelTopology:e.modelTopology,format:e.format,generatedBy:e.generatedBy,convertedBy:e.convertedBy,weightsManifest:t};return null!=e.signature&&(n.signature=e.signature),null!=e.userDefinedMetadata&&(n.userDefinedMetadata=e.userDefinedMetadata),null!=e.modelInitializer&&(n.modelInitializer=e.modelInitializer),null!=e.initializerSignature&&(n.initializerSignature=e.initializerSignature),null!=e.trainingConfig&&(n.trainingConfig=e.trainingConfig),n}function Ws(e,t,n){const r={modelTopology:e.modelTopology,format:e.format,generatedBy:e.generatedBy,convertedBy:e.convertedBy};if(null!=e.trainingConfig&&(r.trainingConfig=e.trainingConfig),null!=e.weightsManifest){if(!t)throw new Error("modelJSON has weightsManifest but weightSpecs is null");if(!n)throw new Error("modelJSON has weightsManifest but weightData is null");r.weightSpecs=t,r.weightData=n}return null!=e.signature&&(r.signature=e.signature),null!=e.userDefinedMetadata&&(r.userDefinedMetadata=e.userDefinedMetadata),null!=e.modelInitializer&&(r.modelInitializer=e.modelInitializer),null!=e.initializerSignature&&(r.initializerSignature=e.initializerSignature),r}async function Gs(e,t){let n,r;return null!=e.weightsManifest&&([n,r]=await t(e.weightsManifest)),Ws(e,n,r)}function qs(e){if(e.modelTopology instanceof ArrayBuffer)throw new Error("Expected JSON model topology, received ArrayBuffer.");return{dateSaved:new Date,modelTopologyType:"JSON",modelTopologyBytes:null==e.modelTopology?0:Ps(JSON.stringify(e.modelTopology)),weightSpecsBytes:null==e.weightSpecs?0:Ps(JSON.stringify(e.weightSpecs)),weightDataBytes:null==e.weightData?0:new ls(e.weightData).byteLength}}function Ks(e){const t=[];for(const n of e)t.push(...n.weights);return t}class Hs{constructor(){this.saveRouters=[],this.loadRouters=[]}static getInstance(){return null==Hs.instance&&(Hs.instance=new Hs),Hs.instance}static registerSaveRouter(e){Hs.getInstance().saveRouters.push(e)}static registerLoadRouter(e){Hs.getInstance().loadRouters.push(e)}static getSaveHandlers(e){return Hs.getHandlers(e,"save")}static getLoadHandlers(e,t){return Hs.getHandlers(e,"load",t)}static getHandlers(e,t,n){const r=[];return("load"===t?Hs.getInstance().loadRouters:Hs.getInstance().saveRouters).forEach(t=>{const a=t(e,n);null!==a&&r.push(a)}),r}}const Zs=e=>Hs.getSaveHandlers(e),Js=(e,t)=>Hs.getLoadHandlers(e,t),Xs="tensorflowjs",Ys="models_store",Qs="model_info_store";function eo(){if(!X().getBool("IS_BROWSER"))throw new Error("Failed to obtain IndexedDB factory because the current environmentis not a web browser.");const e="undefined"==typeof window?self:window,t=e.indexedDB||e.mozIndexedDB||e.webkitIndexedDB||e.msIndexedDB||e.shimIndexedDB;if(null==t)throw new Error("The current browser does not appear to support IndexedDB.");return t}function to(e){const t=e.result;t.createObjectStore(Ys,{keyPath:"modelPath"}),t.createObjectStore(Qs,{keyPath:"modelPath"})}class no{constructor(e){if(this.indexedDB=eo(),null==e||!e)throw new Error("For IndexedDB, modelPath must not be null, undefined or empty.");this.modelPath=e}async save(e){if(e.modelTopology instanceof ArrayBuffer)throw new Error("BrowserLocalStorage.save() does not support saving model topology in binary formats yet.");return this.databaseAction(this.modelPath,e)}async load(){return this.databaseAction(this.modelPath)}databaseAction(e,t){return new Promise((e,n)=>{const r=this.indexedDB.open(Xs,1);r.onupgradeneeded=()=>to(r),r.onsuccess=()=>{const a=r.result;if(null==t){const t=a.transaction(Ys,"readonly"),r=t.objectStore(Ys).get(this.modelPath);r.onsuccess=()=>{if(null==r.result)return a.close(),n(new Error(`Cannot find model with path '${this.modelPath}' in IndexedDB.`));e(r.result.modelArtifacts)},r.onerror=e=>(a.close(),n(r.error)),t.oncomplete=()=>a.close()}else{t.weightData=ls.join(t.weightData);const r=qs(t),o=a.transaction(Qs,"readwrite");let i,u,l=o.objectStore(Qs);try{i=l.put({modelPath:this.modelPath,modelArtifactsInfo:r})}catch(s){return n(s)}i.onsuccess=()=>{u=a.transaction(Ys,"readwrite");const i=u.objectStore(Ys);let c;try{c=i.put({modelPath:this.modelPath,modelArtifacts:t,modelArtifactsInfo:r})}catch(s){return n(s)}c.onsuccess=()=>e({modelArtifactsInfo:r}),c.onerror=e=>{l=o.objectStore(Qs);const t=l.delete(this.modelPath);t.onsuccess=()=>(a.close(),n(c.error)),t.onerror=e=>(a.close(),n(c.error))}},i.onerror=e=>(a.close(),n(i.error)),o.oncomplete=()=>{null==u?a.close():u.oncomplete=()=>a.close()}}},r.onerror=e=>n(r.error)})}}no.URL_SCHEME="indexeddb://";const ro=e=>{return X().getBool("IS_BROWSER")&&!Array.isArray(e)&&e.startsWith(no.URL_SCHEME)?(t=e.slice(no.URL_SCHEME.length),new no(t)):null;var t};Hs.registerSaveRouter(ro),Hs.registerLoadRouter(ro);class ao{constructor(){this.indexedDB=eo()}async listModels(){return new Promise((e,t)=>{const n=this.indexedDB.open(Xs,1);n.onupgradeneeded=()=>to(n),n.onsuccess=()=>{const r=n.result,a=r.transaction(Qs,"readonly"),s=a.objectStore(Qs).getAll();s.onsuccess=()=>{const t={};for(const e of s.result)t[e.modelPath]=e.modelArtifactsInfo;e(t)},s.onerror=e=>(r.close(),t(s.error)),a.oncomplete=()=>r.close()},n.onerror=e=>t(n.error)})}async removeModel(e){var t;return e=(t=e).startsWith(no.URL_SCHEME)?t.slice(no.URL_SCHEME.length):t,new Promise((t,n)=>{const r=this.indexedDB.open(Xs,1);r.onupgradeneeded=()=>to(r),r.onsuccess=()=>{const a=r.result,s=a.transaction(Qs,"readwrite"),o=s.objectStore(Qs),i=o.get(e);let u;i.onsuccess=()=>{if(null==i.result)return a.close(),n(new Error(`Cannot find model with path '${e}' in IndexedDB.`));{const r=o.delete(e),s=()=>{u=a.transaction(Ys,"readwrite");const r=u.objectStore(Ys).delete(e);r.onsuccess=()=>t(i.result.modelArtifactsInfo),r.onerror=e=>n(i.error)};r.onsuccess=s,r.onerror=e=>(s(),a.close(),n(i.error))}},i.onerror=e=>(a.close(),n(i.error)),s.oncomplete=()=>{null==u?a.close():u.oncomplete=()=>a.close()}},r.onerror=e=>n(r.error)})}}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const so="/",oo="tensorflowjs_models",io="info",uo="model_topology",lo="weight_specs",co="weight_data",po="model_metadata";function ho(e){return{info:[oo,e,io].join(so),topology:[oo,e,uo].join(so),weightSpecs:[oo,e,lo].join(so),weightData:[oo,e,co].join(so),modelMetadata:[oo,e,po].join(so)}}function mo(e){for(const t of Object.values(e))window.localStorage.removeItem(t)}function fo(e){const t=e.split(so);if(t.length<3)throw new Error(`Invalid key format: ${e}`);return t.slice(1,t.length-1).join(so)}class go{constructor(e){if(!X().getBool("IS_BROWSER")||"undefined"==typeof window||void 0===window.localStorage)throw new Error("The current environment does not support local storage.");if(this.LS=window.localStorage,null==e||!e)throw new Error("For local storage, modelPath must not be null, undefined or empty.");this.modelPath=e,this.keys=ho(this.modelPath)}async save(e){if(e.modelTopology instanceof ArrayBuffer)throw new Error("BrowserLocalStorage.save() does not support saving model topology in binary formats yet.");{const n=JSON.stringify(e.modelTopology),r=JSON.stringify(e.weightSpecs),a=qs(e),s=ls.join(e.weightData);try{this.LS.setItem(this.keys.info,JSON.stringify(a)),this.LS.setItem(this.keys.topology,n),this.LS.setItem(this.keys.weightSpecs,r),this.LS.setItem(this.keys.weightData,function(e){if(Ls)return Buffer.from(e).toString("base64");const t=new Uint8Array(e);let n="";for(let r=0,a=t.length;r<a;r++)n+=String.fromCharCode(t[r]);return btoa(n)}(s));const t={format:e.format,generatedBy:e.generatedBy,convertedBy:e.convertedBy,signature:null!=e.signature?e.signature:void 0,userDefinedMetadata:null!=e.userDefinedMetadata?e.userDefinedMetadata:void 0,modelInitializer:null!=e.modelInitializer?e.modelInitializer:void 0,initializerSignature:null!=e.initializerSignature?e.initializerSignature:void 0,trainingConfig:null!=e.trainingConfig?e.trainingConfig:void 0};return this.LS.setItem(this.keys.modelMetadata,JSON.stringify(t)),{modelArtifactsInfo:a}}catch(t){throw mo(this.keys),new Error(`Failed to save model '${this.modelPath}' to local storage: size quota being exceeded is a possible cause of this failure: modelTopologyBytes=${a.modelTopologyBytes}, weightSpecsBytes=${a.weightSpecsBytes}, weightDataBytes=${a.weightDataBytes}.`)}}}async load(){const e=JSON.parse(this.LS.getItem(this.keys.info));if(null==e)throw new Error(`In local storage, there is no model with name '${this.modelPath}'`);if("JSON"!==e.modelTopologyType)throw new Error("BrowserLocalStorage does not support loading non-JSON model topology yet.");const t={},n=JSON.parse(this.LS.getItem(this.keys.topology));if(null==n)throw new Error(`In local storage, the topology of model '${this.modelPath}' is missing.`);t.modelTopology=n;const r=JSON.parse(this.LS.getItem(this.keys.weightSpecs));if(null==r)throw new Error(`In local storage, the weight specs of model '${this.modelPath}' are missing.`);t.weightSpecs=r;const a=this.LS.getItem(this.keys.modelMetadata);if(null!=a){const e=JSON.parse(a);t.format=e.format,t.generatedBy=e.generatedBy,t.convertedBy=e.convertedBy,null!=e.signature&&(t.signature=e.signature),null!=e.userDefinedMetadata&&(t.userDefinedMetadata=e.userDefinedMetadata),null!=e.modelInitializer&&(t.modelInitializer=e.modelInitializer),null!=e.initializerSignature&&(t.initializerSignature=e.initializerSignature),null!=e.trainingConfig&&(t.trainingConfig=e.trainingConfig)}const s=this.LS.getItem(this.keys.weightData);if(null==s)throw new Error(`In local storage, the binary weight values of model '${this.modelPath}' are missing.`);return t.weightData=function(e){if(Ls){const t=Buffer.from(e,"base64");return t.buffer.slice(t.byteOffset,t.byteOffset+t.byteLength)}const t=atob(e),n=new Uint8Array(t.length);for(let r=0;r<t.length;++r)n.set([t.charCodeAt(r)],r);return n.buffer}(s),t}}go.URL_SCHEME="localstorage://";const yo=e=>{return X().getBool("IS_BROWSER")&&!Array.isArray(e)&&e.startsWith(go.URL_SCHEME)?(t=e.slice(go.URL_SCHEME.length),new go(t)):null;var t};Hs.registerSaveRouter(yo),Hs.registerLoadRouter(yo);class bo{constructor(){p(X().getBool("IS_BROWSER"),()=>"Current environment is not a web browser"),p("undefined"==typeof window||void 0!==window.localStorage,()=>"Current browser does not appear to support localStorage"),this.LS=window.localStorage}async listModels(){const e={},t=oo+so,n=so+io;for(let r=0;r<this.LS.length;++r){const a=this.LS.key(r);if(a.startsWith(t)&&a.endsWith(n)){e[fo(a)]=JSON.parse(this.LS.getItem(a))}}return e}async removeModel(e){var t;const n=ho(e=(t=e).startsWith(go.URL_SCHEME)?t.slice(go.URL_SCHEME.length):t);if(null==this.LS.getItem(n.info))throw new Error(`Cannot find model at path '${e}'`);const r=JSON.parse(this.LS.getItem(n.info));return mo(n),r}}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const wo="://";class xo{constructor(){this.managers={}}static getInstance(){return null==xo.instance&&(xo.instance=new xo),xo.instance}static registerManager(e,t){p(null!=e,()=>"scheme must not be undefined or null."),e.endsWith(wo)&&(e=e.slice(0,e.indexOf(wo))),p(e.length>0,()=>"scheme must not be an empty string.");const n=xo.getInstance();p(null==n.managers[e],()=>`A model store manager is already registered for scheme '${e}'.`),n.managers[e]=t}static getManager(e){const t=xo.getInstance().managers[e];if(null==t)throw new Error(`Cannot find model manager for scheme '${e}'`);return t}static getSchemes(){return Object.keys(xo.getInstance().managers)}}function No(e){if(-1===e.indexOf(wo))throw new Error(`The url string provided does not contain a scheme. Supported schemes are: ${xo.getSchemes().join(",")}`);return{scheme:e.split(wo)[0],path:e.split(wo)[1]}}async function So(e,t,n=!1){p(e!==t,()=>`Old path and new path are the same: '${e}'`);const r=Hs.getLoadHandlers(e);p(r.length>0,()=>`Copying failed because no load handler is found for source URL ${e}.`),p(r.length<2,()=>`Copying failed because more than one (${r.length}) load handlers for source URL ${e}.`);const a=r[0],s=Hs.getSaveHandlers(t);p(s.length>0,()=>`Copying failed because no save handler is found for destination URL ${t}.`),p(s.length<2,()=>`Copying failed because more than one (${r.length}) save handlers for destination URL ${t}.`);const o=s[0],i=No(e).scheme,u=No(e).path,l=i===No(e).scheme,c=await a.load();n&&l&&await xo.getManager(i).removeModel(u);const d=await o.save(c);return n&&!l&&await xo.getManager(i).removeModel(u),d.modelArtifactsInfo}
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
class vo{constructor(){this.messageName="setTimeoutCustom",this.functionRefs=[],this.handledMessageCount=0,this.hasEventListener=!1}fetch(e,t){return fetch(e,t)}now(){return performance.now()}encode(e,t){if("utf-8"!==t&&"utf8"!==t)throw new Error(`Browser's encoder only supports utf-8, but got ${t}`);return null==this.textEncoder&&(this.textEncoder=new TextEncoder),this.textEncoder.encode(e)}decode(e,t){return new TextDecoder(t).decode(e)}setTimeoutCustom(e,t){"undefined"!=typeof window&&X().getBool("USE_SETTIMEOUTCUSTOM")?(this.functionRefs.push(e),setTimeout(()=>{window.postMessage({name:this.messageName,index:this.functionRefs.length-1},"*")},t),this.hasEventListener||(this.hasEventListener=!0,window.addEventListener("message",e=>{if(e.source===window&&e.data.name===this.messageName){e.stopPropagation();(0,this.functionRefs[e.data.index])(),this.handledMessageCount++,this.handledMessageCount===this.functionRefs.length&&(this.functionRefs=[],this.handledMessageCount=0)}},!0))):setTimeout(e,t)}isTypedArray(e){return Dr(e)}}if(X().get("IS_BROWSER")){X().setPlatform("browser",new vo);try{xo.registerManager(go.URL_SCHEME,new bo)}catch(Og){}try{xo.registerManager(no.URL_SCHEME,new ao)}catch(Og){}}
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const To=()=>require("node-fetch");let ko;class Eo{constructor(){this.util=require("util"),this.textEncoder=new this.util.TextEncoder}fetch(e,t){return null!=X().global.fetch?X().global.fetch(e,t):(null==ko&&(ko=To()),ko(e,t))}now(){const e=process.hrtime();return 1e3*e[0]+e[1]/1e6}encode(e,t){if("utf-8"!==t&&"utf8"!==t)throw new Error(`Node built-in encoder only supports utf-8, but got ${t}`);return this.textEncoder.encode(e)}decode(e,t){return 0===e.length?"":new this.util.TextDecoder(t).decode(e)}isTypedArray(e){return this.util.types.isFloat32Array(e)||this.util.types.isInt32Array(e)||this.util.types.isUint8Array(e)||this.util.types.isUint8ClampedArray(e)}}
/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function _o(e,t="float32",n){return t=t||"float32",W(e),new ma(e,t,n)}
/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */X().get("IS_NODE")&&!X().get("IS_BROWSER")&&X().setPlatform("node",new Eo);const Io=as({cast_:function(e,t){const n=ts(e,"x","cast");if(!_(t))throw new Error(`Failed to cast to unknown dtype ${t}`);if("string"===t&&"string"!==n.dtype||"string"!==t&&"string"===n.dtype)throw new Error("Only strings can be casted to strings");const r={x:n},a={dtype:t};return Ga.runKernel(Ee,r,a)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Ao=as({clone_:function(e){const t={x:ts(e,"x","clone","string_or_numeric")};return Ga.runKernel(bt,t)}});
/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Mo(e,t=!1){}
/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */Wa();ga={buffer:_o,cast:Io,clone:Ao,print:Mo};const $o=as({add_:
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e,t){let n=ts(e,"a","add"),r=ts(t,"b","add");[n,r]=Ca(n,r);const a={a:n,b:r};return Ga.runKernel(se,a)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Oo=as({floorDiv_:function(e,t){let n=ts(e,"a","floorDiv"),r=ts(t,"b","floorDiv");[n,r]=Ca(n,r);const a={a:n,b:r};return Ga.runKernel(dt,a)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Do=as({div_:function(e,t){let n=ts(e,"a","div"),r=ts(t,"b","div");if([n,r]=Ca(n,r),"int32"===n.dtype&&"int32"===r.dtype)return Oo(n,r);const a={a:n,b:r};return Ga.runKernel(Qe,a,{})}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Ro=as({mul_:function(e,t){let n=ts(e,"a","mul"),r=ts(t,"b","mul");[n,r]=Ca(n,r);const a={a:n,b:r};return Ga.runKernel(Yt,a)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Co=as({abs_:function(e){const t=ts(e,"x","abs");if("complex64"===t.dtype){const e={x:t};return Ga.runKernel(Me,e)}{const e={x:t};return Ga.runKernel(ne,e)}}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Fo=as({acos_:function(e){const t={x:ts(e,"x","acos")};return Ga.runKernel(re,t)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Bo=as({acosh_:function(e){const t={x:ts(e,"x","acosh")};return Ga.runKernel(ae,t)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const zo=as({addN_:function(e){p(Array.isArray(e),()=>"The argument passed to tf.addN() must be a list of tensors"),p(e.length>=1,()=>`Must pass at least one tensor to tf.addN(), but got ${e.length}`);const t=e.map((e,t)=>ts(e,`tensors${t}`,"addN")),n=t[0];t.forEach(e=>{if(e.dtype!==n.dtype)throw new Error("All tensors passed to tf.addN() must have the same dtype")}),t.forEach(e=>{if(!g(e.shape,n.shape))throw new Error("All tensors passed to tf.addN() must have the same shape")});const r=t;return Ga.runKernel(oe,r)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Lo=as({all_:function(e,t=null,n=!1){const r={x:ts(e,"x","all","bool")},a={axis:t,keepDims:n};return Ga.runKernel(ie,r,a)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Po=as({any_:function(e,t=null,n=!1){const r={x:ts(e,"x","any","bool")},a={axis:t,keepDims:n};return Ga.runKernel(ue,r,a)}});
/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Vo=as({argMax_:function(e,t=0){const n={x:ts(e,"x","argMax")},r={axis:t};return Ga.runKernel(le,n,r)}});
/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Uo=as({argMin_:function(e,t=0){const n={x:ts(e,"x","argMin")},r={axis:t};return Ga.runKernel(ce,n,r)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const jo=as({asin_:function(e){const t={x:ts(e,"x","asin")};return Ga.runKernel(pe,t)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Wo=as({asinh_:function(e){const t={x:ts(e,"x","asinh")};return Ga.runKernel(de,t)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Go=as({atan_:function(e){const t={x:ts(e,"x","atan")};return Ga.runKernel(he,t)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const qo=as({atan2_:function(e,t){let n=ts(e,"a","atan2"),r=ts(t,"b","atan2");[n,r]=Ca(n,r);const a={a:n,b:r};return Ga.runKernel(fe,a)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Ko=as({atanh_:function(e){const t={x:ts(e,"x","atanh")};return Ga.runKernel(me,t)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ho(e,t,n,r,a="NHWC",s){return Xo(e,[...t,e[3]],n,s,r,null,null,ii(a))}function Zo(e,t,n,r,a,s,o="channelsLast"){const[i,u]=ei(t);let l;if("channelsLast"===o)l=[i,u,e[3],e[3]];else{if("channelsFirst"!==o)throw new Error(`Unknown dataFormat ${o}`);l=[i,u,e[1],e[1]]}return Xo(e,l,n,r,a,s,!1,o)}function Jo(e,t,n,r,a,s,o="NDHWC"){const[i,u,l]=ti(t);let c,p;if("NDHWC"===o)p="channelsLast",c=[i,u,l,e[4],e[4]];else{if("NCDHW"!==o)throw new Error(`Unknown dataFormat ${o}`);p="channelsFirst",c=[i,u,l,e[1],e[1]]}return Yo(e,c,n,r,a,!1,p,s)}function Xo(e,t,n,r,a,s,o=!1,i="channelsLast"){let[u,l,c,p]=[-1,-1,-1,-1];if("channelsLast"===i)[u,l,c,p]=e;else{if("channelsFirst"!==i)throw new Error(`Unknown dataFormat ${i}`);[u,p,l,c]=e}const[d,h,,m]=t,[f,g]=ei(n),[y,b]=ei(r),w=ni(d,y),x=ni(h,b),{padInfo:N,outHeight:S,outWidth:v}=function(e,t,n,r,a,s,o,i,u){let l,c,p;if("number"==typeof e){l={top:e,bottom:e,left:e,right:e,type:0===e?"VALID":"NUMBER"};const a=function(e,t,n,r,a){null==r&&(r=Qo(e,t,n));const s=e[0],o=e[1],i=ri((s-t+2*r)/n+1,a),u=ri((o-t+2*r)/n+1,a);return[i,u]}([t,n],s,r,e,i);c=a[0],p=a[1]}else if("same"===e){c=Math.ceil(t/r),p=Math.ceil(n/a);const e=Math.max(0,(c-1)*r+s-t),i=Math.max(0,(p-1)*a+o-n),u=Math.floor(e/2),d=e-u,h=Math.floor(i/2);l={top:u,bottom:d,left:h,right:i-h,type:"SAME"}}else if("valid"===e)l={top:0,bottom:0,left:0,right:0,type:"VALID"},c=Math.ceil((t-s+1)/r),p=Math.ceil((n-o+1)/a);else{if("object"!=typeof e)throw Error(`Unknown padding parameter: ${e}`);{const d="channelsLast"===u?e[1][0]:e[2][0],h="channelsLast"===u?e[1][1]:e[2][1],m="channelsLast"===u?e[2][0]:e[3][0],f="channelsLast"===u?e[2][1]:e[3][1];l={top:d,bottom:h,left:m,right:f,type:0===d&&0===h&&0===m&&0===f?"VALID":"EXPLICIT"},c=ri((t-s+d+h)/r+1,i),p=ri((n-o+m+f)/a+1,i)}}return{padInfo:l,outHeight:c,outWidth:p}}(a,l,c,f,g,w,x,s,i),T=o?m*p:m;let k;return"channelsFirst"===i?k=[u,T,S,v]:"channelsLast"===i&&(k=[u,S,v,T]),{batchSize:u,dataFormat:i,inHeight:l,inWidth:c,inChannels:p,outHeight:S,outWidth:v,outChannels:T,padInfo:N,strideHeight:f,strideWidth:g,filterHeight:d,filterWidth:h,effectiveFilterHeight:w,effectiveFilterWidth:x,dilationHeight:y,dilationWidth:b,inShape:e,outShape:k,filterShape:t}}function Yo(e,t,n,r,a,s=!1,o="channelsLast",i){let[u,l,c,p,d]=[-1,-1,-1,-1,-1];if("channelsLast"===o)[u,l,c,p,d]=e;else{if("channelsFirst"!==o)throw new Error(`Unknown dataFormat ${o}`);[u,d,l,c,p]=e}const[h,m,f,,g]=t,[y,b,w]=ti(n),[x,N,S]=ti(r),v=ni(h,x),T=ni(m,N),k=ni(f,S),{padInfo:E,outDepth:_,outHeight:I,outWidth:A}=function(e,t,n,r,a,s,o,i,u,l,c){let p,d,h,m;"valid"===e&&(e=0);if("number"==typeof e){p={top:e,bottom:e,left:e,right:e,front:e,back:e,type:0===e?"VALID":"NUMBER"};const f=function(e,t,n,r,a,s){null==a&&(a=Qo(e,t[0],r[0]));const o=[0,0,0,n];for(let i=0;i<3;i++)e[i]+2*a>=t[i]&&(o[i]=ri((e[i]-t[i]+2*a)/r[i]+1,s));return o}([t,n,r,1],[i,u,l],1,[a,s,o],e,c);d=f[0],h=f[1],m=f[2]}else{if("same"!==e)throw Error(`Unknown padding parameter: ${e}`);{d=Math.ceil(t/a),h=Math.ceil(n/s),m=Math.ceil(r/o);const e=(d-1)*a+i-t,c=(h-1)*s+u-n,f=(m-1)*o+l-r,g=Math.floor(e/2),y=e-g,b=Math.floor(c/2),w=c-b,x=Math.floor(f/2);p={top:b,bottom:w,left:x,right:f-x,front:g,back:y,type:"SAME"}}}return{padInfo:p,outDepth:d,outHeight:h,outWidth:m}}(a,l,c,p,y,b,w,v,T,k,i),M=s?g*d:g;let $;return"channelsFirst"===o?$=[u,M,_,I,A]:"channelsLast"===o&&($=[u,_,I,A,M]),{batchSize:u,dataFormat:o,inDepth:l,inHeight:c,inWidth:p,inChannels:d,outDepth:_,outHeight:I,outWidth:A,outChannels:M,padInfo:E,strideDepth:y,strideHeight:b,strideWidth:w,filterDepth:h,filterHeight:m,filterWidth:f,effectiveFilterDepth:v,effectiveFilterHeight:T,effectiveFilterWidth:k,dilationDepth:x,dilationHeight:N,dilationWidth:S,inShape:e,outShape:$,filterShape:t}}function Qo(e,t,n,r=1){const a=ni(t,r);return Math.floor((e[0]*(n-1)-n+a)/2)}function ei(e){return"number"==typeof e?[e,e,e]:2===e.length?[e[0],e[1],1]:e}function ti(e){return"number"==typeof e?[e,e,e]:e}function ni(e,t){return t<=1?e:e+(e-1)*(t-1)}function ri(e,t){if(!t)return Math.trunc(e);switch(t){case"round":return Math.round(e);case"ceil":return Math.ceil(e);case"floor":return Math.floor(e);default:throw new Error(`Unknown roundingMode ${t}`)}}function ai(e){const[t,n,r]=ei(e);return 1===t&&1===n&&1===r}function si(e,t){return ai(e)||ai(t)}function oi(e){return ei(e).every(e=>e>0)}function ii(e){if("NHWC"===e)return"channelsLast";if("NCHW"===e)return"channelsFirst";throw new Error(`Unknown dataFormat ${e}`)}function ui(e,t,n){if(null!=n){if("string"==typeof t)throw Error(`Error in ${e}: pad must be an integer when using dimRoundingMode ${n} but got pad ${t}.`);if("number"==typeof t)p(y(t),()=>`Error in ${e}: pad must be an integer when using dimRoundingMode ${n} but got pad ${t}.`);else{if("object"!=typeof t)throw Error(`Error in ${e}: Unknown padding parameter: ${t}`);t.forEach(t=>{t.forEach(t=>{p(y(t),()=>`Error in ${e}: pad must be an integer when using dimRoundingMode ${n} but got pad ${t}.`)})})}}}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const li=as({reshape_:function(e,t){const n={x:ts(e,"x","reshape","string_or_numeric")},r={shape:t};return Ga.runKernel(xn,n,r)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const ci=as({avgPool_:function(e,t,n,r,a){const s=ts(e,"x","avgPool","float32");p(si(n,1),()=>`Error in avgPool: Either strides or dilations must be 1. Got strides ${n} and dilations '1'`);let o=s,i=!1;3===s.rank&&(i=!0,o=li(s,[1,s.shape[0],s.shape[1],s.shape[2]])),p(4===o.rank,()=>`Error in avgPool: x must be rank 4 but got rank ${o.rank}.`),ui("avgPool",r,a);const u={x:o},l={filterSize:t,strides:n,pad:r,dimRoundingMode:a};let c=Ga.runKernel(ge,u,l);return c=Io(c,s.dtype),i?li(c,[c.shape[1],c.shape[2],c.shape[3]]):c}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const pi=as({avgPool3d_:function(e,t,n,r,a,s="NDHWC"){const o=ts(e,"x","avgPool3d","float32");let i=o,u=!1;4===o.rank&&(u=!0,i=li(o,[1,o.shape[0],o.shape[1],o.shape[2],o.shape[3]])),p(5===i.rank,()=>`Error in avgPool3d: x must be rank 5 but got rank ${i.rank}.`),p("NDHWC"===s,()=>`Error in avgPool3d: Only NDHWC is currently supported, but got dataFormat of ${s}`),p("number"==typeof n&&n>0||Array.isArray(n)&&n[0]>0&&n[1]>0&&n[2]>0,()=>`Error in avgPool3d: Stride must be > 0, but got '${n}'`),ui("avgPool3d",r,a);const l={x:i},c={filterSize:t,strides:n,pad:r,dimRoundingMode:a,dataFormat:s};let d=Ga.runKernel(be,l,c);return d=Io(d,i.dtype),u?li(d,[d.shape[1],d.shape[2],d.shape[3],d.shape[4]]):d}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const di=as({concat_:function(e,t=0){p(e.length>=1,()=>"Pass at least one tensor to concat");const n=ns(e,"tensors","concat","string_or_numeric");if("complex64"===n[0].dtype&&n.forEach(e=>{if("complex64"!==e.dtype)throw new Error(`Cannot concatenate complex64 tensors with a tensor\n          with dtype ${e.dtype}. `)}),1===n.length)return Ao(n[0]);const r=n,a={axis:t};return Ga.runKernel($e,r,a)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const hi=as({matMul_:function(e,t,n=!1,r=!1){let a=ts(e,"a","matMul"),s=ts(t,"b","matMul");[a,s]=Ca(a,s);const o={a:a,b:s},i={transposeA:n,transposeB:r};return Ga.runKernel(xe,o,i)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const mi=as({sigmoid_:function(e){const t={x:ts(e,"x","sigmoid","float32")};return Ga.runKernel(zn,t)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const fi=as({slice_:function(e,t,n){const r=ts(e,"x","slice","string_or_numeric");if(0===r.rank)throw new Error("Slicing scalar is not possible");const a={x:r},s={begin:t,size:n};return Ga.runKernel(Rn,a,s)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const gi=as({tanh_:function(e){const t={x:ts(e,"x","tanh","float32")};return Ga.runKernel(sr,t)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const yi=as({basicLSTMCell_:function(e,t,n,r,a,s){const o=ts(e,"forgetBias","basicLSTMCell"),i=ts(t,"lstmKernel","basicLSTMCell"),u=ts(n,"lstmBias","basicLSTMCell"),l=ts(r,"data","basicLSTMCell"),c=ts(a,"c","basicLSTMCell"),p=ts(s,"h","basicLSTMCell"),d=di([l,p],1),h=hi(d,i),m=$o(h,u),f=m.shape[0],g=m.shape[1]/4,y=[f,g],b=fi(m,[0,0],y),w=fi(m,[0,g],y),x=fi(m,[0,2*g],y),N=fi(m,[0,3*g],y),S=$o(Ro(mi(b),gi(w)),Ro(c,mi($o(o,x))));return[S,Ro(gi(S),mi(N))]}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const bi=as({batchToSpaceND_:function(e,t,n){const r=ts(e,"x","batchToSpaceND"),a=t.reduce((e,t)=>e*t);p(r.rank>=1+t.length,()=>`input rank is ${r.rank} but should be > than blockShape.length ${t.length}`),p(n.length===t.length,()=>`crops.length is ${n.length} but should be equal to blockShape.length  ${t.length}`),p(r.shape[0]%a===0,()=>`input tensor batch is ${r.shape[0]} but is not divisible by the product of the elements of blockShape ${t.join(" * ")} === ${a}`);const s={x:r},o={blockShape:t,crops:n};return Ga.runKernel(Ne,s,o)}});const wi=as({batchNorm_:
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e,t,n,r,a,s){null==s&&(s=.001);const o=ts(e,"x","batchNorm"),i=ts(t,"mean","batchNorm"),u=ts(n,"variance","batchNorm");let l,c;null!=a&&(l=ts(a,"scale","batchNorm")),null!=r&&(c=ts(r,"offset","batchNorm")),p(i.rank===u.rank,()=>"Batch normalization gradient requires mean and variance to have equal ranks."),p(null==c||i.rank===c.rank,()=>"Batch normalization gradient requires mean and offset to have equal ranks."),p(null==l||i.rank===l.rank,()=>"Batch normalization gradient requires mean and scale to have equal ranks.");const d={x:function(e){let t;return t=0===e.rank||1===e.rank?li(e,[1,1,1,e.size]):2===e.rank?li(e,[1,1,e.shape[0],e.shape[1]]):3===e.rank?li(e,[1,e.shape[0],e.shape[1],e.shape[2]]):e,t}(o),scale:l,offset:c,mean:i,variance:u},h={varianceEpsilon:s},m=Ga.runKernel(ht,d,h);return li(m,o.shape)}});const xi=as({batchNorm2d_:function(e,t,n,r,a,s){const o=ts(e,"x","batchNorm"),i=ts(t,"mean","batchNorm"),u=ts(n,"variance","batchNorm");let l,c;return null!=a&&(l=ts(a,"scale","batchNorm")),null!=r&&(c=ts(r,"offset","batchNorm")),p(2===o.rank,()=>`Error in batchNorm2D: x must be rank 2 but got rank ${o.rank}.`),p(2===i.rank||1===i.rank,()=>`Error in batchNorm2D: mean must be rank 2 or rank 1 but got rank ${i.rank}.`),p(2===u.rank||1===u.rank,()=>`Error in batchNorm2D: variance must be rank 2 or rank 1 but got rank ${u.rank}.`),null!=l&&p(2===l.rank||1===l.rank,()=>`Error in batchNorm2D: scale must be rank 2 or rank 1 but got rank ${l.rank}.`),null!=c&&p(2===c.rank||1===c.rank,()=>`Error in batchNorm2D: offset must be rank 2 or rank 1 but got rank ${c.rank}.`),wi(o,i,u,c,l,s)}});const Ni=as({batchNorm3d_:function(e,t,n,r,a,s){const o=ts(e,"x","batchNorm"),i=ts(t,"mean","batchNorm"),u=ts(n,"variance","batchNorm");let l,c;return null!=a&&(l=ts(a,"scale","batchNorm")),null!=r&&(c=ts(r,"offset","batchNorm")),p(3===o.rank,()=>`Error in batchNorm3D: x must be rank 3 but got rank ${o.rank}.`),p(3===i.rank||1===i.rank,()=>`Error in batchNorm3D: mean must be rank 3 or rank 1 but got rank ${i.rank}.`),p(3===u.rank||1===u.rank,()=>`Error in batchNorm3D: variance must be rank 3 or rank 1 but got rank ${u.rank}.`),null!=l&&p(3===l.rank||1===l.rank,()=>`Error in batchNorm3D: scale must be rank 3 or rank 1 but got rank ${l.rank}.`),null!=c&&p(3===c.rank||1===c.rank,()=>`Error in batchNorm3D: offset must be rank 3 or rank 1 but got rank ${c.rank}.`),wi(o,i,u,c,l,s)}});const Si=as({batchNorm4d_:function(e,t,n,r,a,s){const o=ts(e,"x","batchNorm"),i=ts(t,"mean","batchNorm"),u=ts(n,"variance","batchNorm");let l,c;return null!=a&&(l=ts(a,"scale","batchNorm")),null!=r&&(c=ts(r,"offset","batchNorm")),p(4===o.rank,()=>`Error in batchNorm4D: x must be rank 4 but got rank ${o.rank}.`),p(4===i.rank||1===i.rank,()=>`Error in batchNorm4D: mean must be rank 4 or rank 1 but got rank ${i.rank}.`),p(4===u.rank||1===u.rank,()=>`Error in batchNorm4D: variance must be rank 4 or rank 1 but got rank ${u.rank}.`),null!=l&&p(4===l.rank||1===l.rank,()=>`Error in batchNorm4D: scale must be rank 4 or rank 1 but got rank ${l.rank}.`),null!=c&&p(4===c.rank||1===c.rank,()=>`Error in batchNorm4D: offset must be rank 4 or rank 1 but got rank ${c.rank}.`),wi(o,i,u,c,l,s)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const vi=as({bincount_:function(e,t,n){const r=ts(e,"x","bincount"),a=ts(t,"weights","bincount");p("int32"===r.dtype,()=>`Error in bincount: input dtype must be int32, but got ${r.dtype}`),p(n>=0,()=>`size must be non-negative, but got ${n}.`),p(a.size===r.size||0===a.size,()=>`Error in bincount: weights must have the same size as input or0-length, but got input shape: ${r.shape}, weights shape: ${a.shape}.`);const s={x:r,weights:a},o={size:n};return Ga.runKernel(Se,s,o)}});
/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Ti=as({bitwiseAnd_:function(e,t){const n=ts(e,"x","bitwiseAnd"),r=ts(t,"y","bitwiseAnd");if(!g(n.shape,r.shape))throw new Error(`BitwiseAnd: Tensors must have the same shape. x: ${n.shape}, y: ${r.shape}`);if("int32"!==n.dtype||"int32"!==r.dtype)throw new Error(`BitwiseAnd: Only supports 'int32' values in tensor, found type of x: ${n.dtype} and type of y: ${r.dtype}`);const a={a:n,b:r};return Ga.runKernel(ve,a)}});
/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const ki=as({broadcastArgs_:function(e,t){const n=ts(e,"s0","broadcastArgs","int32"),r=ts(t,"s1","broadcastArgs","int32");if(1!==n.rank)throw new Error(`broadcastArgs(): first input must be a vector (rank=1). Has rank ${n.rank}`);if(1!==r.rank)throw new Error(`broadcastArgs(): second input must be a vector (rank=1). Has rank ${r.rank}`);const a={s0:n,s1:r};return Ga.runKernel(ke,a)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Ei=as({broadcastTo_:function(e,t){let n=ts(e,"broadcastTo","x");const r=n.shape;if(W(t),t.length<n.rank)throw new Error(`broadcastTo(): shape.length=${t.length} < input.rank=${n.rank}.`);if(t.length>n.rank){const e=n.shape.slice();for(;e.length<t.length;)e.unshift(1);n=li(n,e)}const a=n.shape,s=Array.from(t);for(let u=t.length-1;u>=0;u--)if(a[u]===t[u])s[u]=1;else if(1!==n.shape[u])throw new Error(`broadcastTo(): [${r}] cannot be broadcast to [${t}].`);if(0===s.map((e,t)=>e>1?t:-1).filter(e=>e>=0).length)return Ao(n);const o={x:n},i={reps:s};return Ga.runKernel(or,o,i)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const _i=as({ceil_:function(e){const t={x:ts(e,"x","ceil","float32")};return Ga.runKernel(_e,t)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ii(e,t,n){W(e);const r={shape:e,value:t,dtype:n=n||R(t)};return Ga.runKernel(lt,{},r)}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Ai=as({clipByValue_:function(e,t,n){const r=ts(e,"x","clipByValue");if(p(t<=n,()=>`Error in clip: min (${t}) must be less than or equal to max (${n}).`),t===n)return Ii(r.shape,t,r.dtype);const a={x:r},s={clipValueMin:t,clipValueMax:n};return Ga.runKernel(Ie,a,s)}});const Mi=as({concat1d_:function(e){return di(e,0)}});const $i=as({concat2d_:function(e,t){return di(e,t)}});const Oi=as({concat3d_:function(e,t){return di(e,t)}});const Di=as({concat4d_:function(e,t){return di(e,t)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Ri=as({conv2d_:function(e,t,n,r,a="NHWC",s=[1,1],o){const i=ts(e,"x","conv2d","float32"),u=ts(t,"filter","conv2d","float32");let l=i,c=!1;3===i.rank&&(c=!0,l=li(i,[1,i.shape[0],i.shape[1],i.shape[2]])),p(4===l.rank,()=>`Error in conv2d: input must be rank 4, but got rank ${l.rank}.`),p(4===u.rank,()=>`Error in conv2d: filter must be rank 4, but got rank ${u.rank}.`),ui("conv2d",r,o);const d="NHWC"===a?l.shape[3]:l.shape[1];p(d===u.shape[2],()=>`Error in conv2d: depth of input (${d}) must match input depth for filter ${u.shape[2]}.`),p(si(n,s),()=>`Error in conv2D: Either strides or dilations must be 1. Got strides ${n} and dilations '${s}'`),p(oi(s),()=>"Error in conv2D: Dilated rates should be larger than 0."),p(oi(n),()=>"Error in conv2D: Strides should be larger than 0.");const h={x:l,filter:u},m={strides:n,pad:r,dataFormat:a,dilations:s,dimRoundingMode:o},f=Ga.runKernel(Oe,h,m);return c?li(f,[f.shape[1],f.shape[2],f.shape[3]]):f}});const Ci=as({conv1d_:function(e,t,n,r,a="NWC",s=1,o){const i=ts(e,"x","conv1d"),u=ts(t,"filter","conv1d");let l=i,c=!1;2===i.rank&&(c=!0,l=li(i,[1,i.shape[0],i.shape[1]])),p(3===l.rank,()=>`Error in conv1d: input must be rank 3, but got rank ${l.rank}.`),p(3===u.rank,()=>`Error in conv1d: filter must be rank 3, but got rank ${u.rank}.`),ui("conv1d",r,o),p(l.shape[2]===u.shape[1],()=>`Error in conv1d: depth of input (${l.shape[2]}) must match input depth for filter ${u.shape[1]}.`),p(si(n,s),()=>`Error in conv1D: Either stride or dilation must be 1. Got stride ${n} and dilation '${s}'`),p(oi(s),()=>"Error in conv1D: Dilated rates should be larger than 0."),p(oi(n),()=>"Error in conv1D: Stride should be larger than 0."),p("NWC"===a,()=>`Error in conv1d: got dataFormat of ${a} but only NWC is currently supported.`);const d=li(u,[1,u.shape[0],u.shape[1],u.shape[2]]),h=li(l,[l.shape[0],1,l.shape[1],l.shape[2]]),m=Ri(h,d,[1,n],r,"NHWC",[1,s],o);return li(m,c?[m.shape[2],m.shape[3]]:[m.shape[0],m.shape[2],m.shape[3]])}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Fi=as({conv2DBackpropInput_:function(e,t,n,r,a,s="NHWC",o){p(e.length===t.rank,()=>`Length of inShape (${e.length}) and rank of dy (${t.rank}) must match`);let i=e,u=t,l=!1;3===t.rank&&(l=!0,u=li(t,[1,t.shape[0],t.shape[1],t.shape[2]]),i=[1,e[0],e[1],e[2]]),p(4===i.length,()=>`Error in conv2dDerInput: inShape must be length 4, but got length ${i.length}.`),p(4===u.rank,()=>`Error in conv2dDerInput: dy must be rank 4, but got rank ${u.rank}`),p(4===n.rank,()=>`Error in conv2dDerInput: filter must be rank 4, but got rank ${n.rank}`);const c="NHWC"===s?i[3]:i[1],d="NHWC"===s?u.shape[3]:u.shape[1];p(c===n.shape[2],()=>`Error in conv2dDerInput: depth of input (${c}) must match input depth for filter ${n.shape[2]}.`),p(d===n.shape[3],()=>`Error in conv2dDerInput: depth of output (${d}) must match output depth for filter ${n.shape[3]}.`),ui("conv2dDerInput",a,o);const h={dy:u,filter:n},m={strides:r,pad:a,dataFormat:s,dimRoundingMode:o,inputShape:i},f=Ga.runKernel(Re,h,m);return l?li(f,[f.shape[1],f.shape[2],f.shape[3]]):f}});const Bi=as({conv2dTranspose_:function(e,t,n,r,a,s){const o=ts(e,"x","conv2dTranspose"),i=ts(t,"filter","conv2dTranspose");return Fi(n,o,i,r,a,"NHWC",s)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const zi=as({conv3d_:function(e,t,n,r,a="NDHWC",s=[1,1,1]){const o=ts(e,"x","conv3d"),i=ts(t,"filter","conv3d");let u=o,l=!1;4===o.rank&&(l=!0,u=li(o,[1,o.shape[0],o.shape[1],o.shape[2],o.shape[3]])),p(5===u.rank,()=>`Error in conv3d: input must be rank 5, but got rank ${u.rank}.`),p(5===i.rank,()=>`Error in conv3d: filter must be rank 5, but got rank ${i.rank}.`),p(u.shape[4]===i.shape[3],()=>`Error in conv3d: depth of input (${u.shape[4]}) must match input depth for filter ${i.shape[3]}.`),p(si(n,s),()=>`Error in conv3D: Either strides or dilations must be 1. Got strides ${n} and dilations '${s}'`),p("NDHWC"===a,()=>`Error in conv3d: got dataFormat of ${a} but only NDHWC is currently supported.`),p(oi(s),()=>"Error in conv3D: Dilated rates should be larger than 0."),p(oi(n),()=>"Error in conv3D: Strides should be larger than 0.");const c={x:u,filter:i},d={strides:n,pad:r,dataFormat:a,dilations:s},h=Ga.runKernel(Ce,c,d);return l?li(h,[h.shape[1],h.shape[2],h.shape[3],h.shape[4]]):h}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Li=as({conv3DBackpropInput_:function(e,t,n,r,a){p(e.length===t.rank,()=>`Length of inShape (${e.length}) and rank of dy (${t.rank}) must match`);let s=e,o=t,i=!1;4===t.rank&&(i=!0,o=li(t,[1,t.shape[0],t.shape[1],t.shape[2],t.shape[3]]),s=[1,e[0],e[1],e[2],e[3]]);const u=s[4],l=o.shape[4];p(5===s.length,()=>`Error in conv3dDerInput: inShape must be length 5, but got length ${s.length}.`),p(5===o.rank,()=>`Error in conv3dDerInput: dy must be rank 5, but got rank ${o.rank}`),p(5===n.rank,()=>`Error in conv3dDerInput: filter must be rank 5, but got rank ${n.rank}`),p(u===n.shape[3],()=>`Error in conv3dDerInput: depth of input (${u}) must match input depth for filter ${n.shape[3]}.`),p(l===n.shape[4],()=>`Error in conv3dDerInput: depth of output (${l}) must match output depth for filter ${n.shape[4]}.`);const c={dy:o,filter:n},d={pad:a,strides:r,inputShape:s},h=Ga.runKernel(Be,c,d);return i?li(h,[h.shape[1],h.shape[2],h.shape[3],h.shape[4]]):h}});const Pi=as({conv3dTranspose_:function(e,t,n,r,a){const s=ts(e,"x","conv3dTranspose"),o=ts(t,"filter","conv3dTranspose");return Li(n,s,o,r,a)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Vi=as({cos_:function(e){const t={x:ts(e,"x","cos","float32")};return Ga.runKernel(ze,t)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Ui=as({cosh_:function(e){const t={x:ts(e,"x","cosh","float32")};return Ga.runKernel(Le,t)}});
/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const ji=as({cumprod_:function(e,t=0,n=!1,r=!1){const a={x:ts(e,"x","cumprod")},s={axis:t,exclusive:n,reverse:r};return Ga.runKernel(Pe,a,s)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Wi=as({cumsum_:function(e,t=0,n=!1,r=!1){const a={x:ts(e,"x","cumsum")},s={axis:t,exclusive:n,reverse:r};return Ga.runKernel(Ve,a,s)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Gi=as({denseBincount_:function(e,t,n,r=!1){const a=ts(e,"x","denseBincount"),s=ts(t,"weights","denseBincount");p("int32"===a.dtype,()=>`Error in denseBincount: input dtype must be int32, but got ${a.dtype}`),p(a.rank<=2,()=>`Error in denseBincount: input must be at most rank 2, but got rank ${a.rank}.`),p(n>=0,()=>`size must be non-negative, but got ${n}.`),p(s.size===a.size||0===s.size,()=>`Error in denseBincount: weights must have the same shape as x or 0-length, but got x shape: ${a.shape}, weights shape: ${s.shape}.`);const o={x:a,weights:s},i={size:n,binaryOutput:r};return Ga.runKernel(je,o,i)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const qi=as({depthToSpace_:function(e,t,n="NHWC"){const r=ts(e,"x","depthToSpace","float32"),a="NHWC"===n?r.shape[1]:r.shape[2],s="NHWC"===n?r.shape[2]:r.shape[3],o="NHWC"===n?r.shape[3]:r.shape[1];p(t>1,()=>`blockSize should be > 1 for depthToSpace, but was: ${t}`),p(a*t>=0,()=>`Negative dimension size caused by overflow when multiplying\n    ${a} and ${t}  for depthToSpace with input shape\n    ${r.shape}`),p(s*t>=0,()=>`Negative dimension size caused by overflow when multiplying\n    ${s} and ${t} for depthToSpace with input shape\n        ${r.shape}`),p(o%(t*t)===0,()=>`Dimension size must be evenly divisible by ${t*t} but is ${o} for depthToSpace with input shape ${r.shape}`);const i={x:r},u={blockSize:t,dataFormat:n};return Ga.runKernel(We,i,u)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Ki=as({depthwiseConv2d_:function(e,t,n,r,a="NHWC",s=[1,1],o){const i=ts(e,"x","depthwiseConv2d","float32"),u=ts(t,"filter","depthwiseConv2d","float32");let l=i,c=!1;3===i.rank&&(c=!0,l=li(i,[1,i.shape[0],i.shape[1],i.shape[2]])),p(4===l.rank,()=>`Error in depthwiseConv2d: input must be rank 4, but got rank ${l.rank}.`),p(4===u.rank,()=>`Error in depthwiseConv2d: filter must be rank 4, but got rank ${u.rank}.`);const d="NHWC"===a?l.shape[3]:l.shape[1];p(d===u.shape[2],()=>`Error in depthwiseConv2d: number of input channels (${d}) must match the inChannels dimension in filter ${u.shape[2]}.`),ui("depthwiseConv2d",r,o);const h={x:l,filter:u},m={strides:n,pad:r,dataFormat:a,dilations:s,dimRoundingMode:o},f=Ga.runKernel(Ge,h,m);return c?li(f,[f.shape[1],f.shape[2],f.shape[3]]):f}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Hi=as({diag_:function(e){const t={x:ts(e,"x","diag")};return Ga.runKernel(He,t)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Zi=as({dilation2d_:function(e,t,n,r,a=[1,1],s="NHWC"){const o=ts(e,"x","dilation2d"),i=ts(t,"filter","dilation2d");p(3===o.rank||4===o.rank,()=>`Error in dilation2d: input must be rank 3 or 4, but got rank ${o.rank}.`),p(3===i.rank,()=>`Error in dilation2d: filter must be rank 3, but got rank ${i.rank}.`),p("NHWC"===s,()=>`Error in dilation2d: Only NHWC is currently supported, but got dataFormat of ${s}`);let u=o,l=!1;3===o.rank&&(u=li(o,[1,o.shape[0],o.shape[1],o.shape[2]]),l=!0),p(u.shape[3]===i.shape[2],()=>`Error in dilation2d:  input and filter must have the same depth: ${u.shape[3]} vs ${i.shape[2]}`);const c={x:u,filter:i},d={strides:n,pad:r,dilations:a},h=Ga.runKernel(Ze,c,d);return l?li(h,[h.shape[1],h.shape[2],h.shape[3]]):h}});
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ji(e,t){const n=e.length,r=[];for(let a=0;a<n;a++){const s=n-1-a,o=e[s]||1;(t[t.length-1-a]||1)>1&&1===o&&r.unshift(s)}return r}function Xi(e,t){const n=[];for(let r=0;r<t.length;r++){const a=e[e.length-r-1],s=t.length-r-1,o=t[s];(null==a||1===a&&o>1)&&n.unshift(s)}return n}function Yi(e,t){const n=Math.max(e.length,t.length),r=new Array(n);for(let a=0;a<n;a++){let s=e[e.length-a-1];null==s&&(s=1);let o=t[t.length-a-1];if(null==o&&(o=1),1===s)r[n-a-1]=o;else if(1===o)r[n-a-1]=s;else{if(s!==o){throw Error(`Operands could not be broadcast together with shapes ${e} and ${t}.`)}r[n-a-1]=s}}return r}const Qi=Object.freeze(Object.defineProperty({__proto__:null,assertAndGetBroadcastShape:Yi,getBroadcastDims:Ji,getReductionAxes:Xi},Symbol.toStringTag,{value:"Module"}));
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const eu=as({equal_:function(e,t){let n=ts(e,"a","equal","string_or_numeric"),r=ts(t,"b","equal","string_or_numeric");[n,r]=Ca(n,r),Yi(n.shape,r.shape);const a={a:n,b:r};return Ga.runKernel(at,a)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const tu=as({where_:function(e,t,n){const r=ts(t,"a","where"),a=ts(n,"b","where"),s=ts(e,"condition","where","bool"),o=Yi(Yi(s.shape,r.shape),a.shape),i={condition:Ei(s,o),t:Ei(r,o),e:Ei(a,o)};return Ga.runKernel(On,i)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const nu=as({zerosLike_:function(e){const t={x:ts(e,"x","zerosLike")};return Ga.runKernel(mr,t)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const ru=as({divNoNan_:function(e,t){let n=ts(e,"a","div"),r=ts(t,"b","div");[n,r]=Ca(n,r);const a=Do(n,r),s=nu(a),o=eu(r,s);return tu(o,s,a)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const au=as({dot_:function(e,t){const n=ts(e,"t1","dot"),r=ts(t,"t2","dot");p(!(1!==n.rank&&2!==n.rank||1!==r.rank&&2!==r.rank),()=>`Error in dot: inputs must all be rank 1 or 2, but got ranks ${n.rank} and ${r.rank}.`);const a=1===n.rank?n.size:n.shape[1],s=1===r.rank?r.size:r.shape[0];if(p(a===s,()=>`Error in dot: inner dimensions of inputs must match, but got ${a} and ${s}.`),1===n.rank&&1===r.rank){const e=li(n,[1,-1]),t=li(r,[-1,1]),a=hi(e,t);return li(a,[])}if(1===n.rank&&2===r.rank){const e=li(n,[1,-1]),t=li(r,[r.shape[0],r.shape[1]]),a=hi(e,t);return li(a,[a.size])}if(2===n.rank&&1===r.rank){const e=li(r,[-1,1]),t=hi(n,e);return li(t,[t.size])}{const e=li(r,[r.shape[0],r.shape[1]]);return hi(n,e)}}});
/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const su=as({einsum_:function(e,...t){const n=t.map((e,t)=>ts(e,`tensors${t}`,"einsum")),r={equation:e};return Ga.runKernel(et,n,r)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const ou=as({elu_:function(e){const t={x:ts(e,"x","elu","float32")};return Ga.runKernel(tt,t)}});
/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const iu=as({ensureShape_:function(e,t){const n=ts(e,"x","ensureShape","string_or_numeric");if(!f(n.shape,t))throw new Error(`EnsureShape: Shape of tensor ${n.shape} is not compatible with expected shape ${t}`);return e}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const uu=as({erf_:function(e){let t=ts(e,"x","erf");p("int32"===t.dtype||"float32"===t.dtype,()=>"Input dtype must be `int32` or `float32`."),"int32"===t.dtype&&(t=Io(t,"float32"));const n={x:t};return Ga.runKernel(rt,n)}});
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function lu(e,t){for(let n=0;n<e.length;++n)if(e[e.length-n-1]!==t-1-n)return!1;return!0}function cu(e,t,n){const r=e.length+t.length,a=[];let s=0,o=0;for(let i=0;i<r;i++)-1===n.indexOf(i)?a.push(e[s++]):a.push(t[o++]);return a}function pu(e,t){const n=[],r=e.length;for(let a=0;a<r;a++)-1===t.indexOf(a)&&n.push(e[a]);return[n,t.map(t=>e[t])]}function du(e,t){return cu(e,t.map(e=>1),t)}function hu(e,t,n){p(lu(t,n),()=>`${e} supports only inner-most axes for now. Got axes ${t} and rank-${n} input.`)}function mu(e,t){if(lu(e,t))return null;const n=[];for(let r=0;r<t;++r)-1===e.indexOf(r)&&n.push(r);return e.forEach(e=>n.push(e)),n}function fu(e){return e.map((e,t)=>[t,e]).sort((e,t)=>e[1]-t[1]).map(e=>e[0])}function gu(e,t){const n=[];for(let r=t-e;r<t;++r)n.push(r);return n}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const yu=as({max_:function(e,t=null,n=!1){const r={x:ts(e,"x","max")},a={reductionIndices:t,keepDims:n};return Ga.runKernel(Lt,r,a)}});
/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const bu=as({min_:function(e,t=null,n=!1){const r={x:ts(e,"x","min")},a={axis:t,keepDims:n};return Ga.runKernel(Kt,r,a)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const wu=as({pow_:function(e,t){let n=ts(e,"base","pow"),r=ts(t,"exp","pow");[n,r]=Ca(n,r);const a={a:n,b:r};return Ga.runKernel(cn,a)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function xu(e,t){if((ra(e)&&"string"!==t||Array.isArray(e))&&"complex64"!==t)throw new Error("Error creating a new Scalar: value must be a primitive (number|boolean|string)");if("string"===t&&ra(e)&&!(e instanceof Uint8Array))throw new Error("When making a scalar from encoded string, the value must be `Uint8Array`.");return os(e,[],[],t)}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Nu=as({sqrt_:function(e){const t={x:ts(e,"x","sqrt","float32")};return Ga.runKernel(Pn,t)}});
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Su=as({square_:function(e){const t=ts(e,"x","square");return Ga.runKernel("Square",{x:t},{})}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const vu=as({sum_:function(e,t=null,n=!1){let r=ts(e,"x","sum");"bool"===r.dtype&&(r=Io(r,"int32"));const a={x:r},s={axis:t,keepDims:n};return Ga.runKernel(Vn,a,s)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Tu(e,t,n=null){if(0===e.rank)return Co(e);if(1!==e.rank&&null===n)return Tu(li(e,[-1]),t,n);if(1===e.rank||"number"==typeof n||Array.isArray(n)&&1===n.length){if(1===t)return vu(Co(e),n);if(t===1/0)return yu(Co(e),n);if(t===-1/0)return bu(Co(e),n);if("euclidean"===t||2===t)return Nu(vu(wu(Co(e),xu(2,"int32")),n));throw new Error(`Error in norm: invalid ord value: ${t}`)}if(Array.isArray(n)&&2===n.length){if(1===t)return yu(vu(Co(e),n[0]),n[1]-1);if(t===1/0)return yu(vu(Co(e),n[1]),n[0]);if(t===-1/0)return bu(vu(Co(e),n[1]),n[0]);if("fro"===t||"euclidean"===t)return Nu(vu(Su(e),n));throw new Error(`Error in norm: invalid ord value: ${t}`)}throw new Error(`Error in norm: invalid axis: ${n}`)}const ku=as({norm_:function(e,t="euclidean",n=null,r=!1){const a=Tu(e=ts(e,"x","norm"),t,n);let s=a.shape;if(r){const t=S(n,e.shape);s=du(a.shape,t)}return li(a,s)}});
/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Eu=as({euclideanNorm_:function(e,t=null,n=!1){return ku(e,"euclidean",t,n)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const _u=as({exp_:function(e){const t={x:ts(e,"x","exp")};return Ga.runKernel(st,t)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Iu=as({expandDims_:function(e,t=0){const n=ts(e,"x","expandDims","string_or_numeric");p(t<=n.rank,()=>"Axis must be <= rank of the tensor");const r={input:n},a={dim:t};return Ga.runKernel(ot,r,a)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Au=as({expm1_:function(e){const t={x:ts(e,"x","expm1")};return Ga.runKernel(it,t)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Mu=as({tile_:function(e,t){const n=ts(e,"x","tile","string_or_numeric");p(n.rank===t.length,()=>`Error in transpose: rank of input ${n.rank} must match length of reps ${t}.`);const r={x:n},a={reps:t};return Ga.runKernel(or,r,a)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const $u=as({eye_:function(e,t,n,r="float32"){null==t&&(t=e);const a=_o([e,t],r),s=e<=t?e:t;for(let i=0;i<s;++i)a.set(1,i,i);const o=li(a.toTensor(),[e,t]);if(null==n)return o;if(1===n.length)return Mu(Iu(o,0),[n[0],1,1]);if(2===n.length)return Mu(Iu(Iu(o,0),0),[n[0],n[1],1,1]);if(3===n.length)return Mu(Iu(Iu(Iu(o,0),0),0),[n[0],n[1],n[2],1,1]);throw new Error(`eye() currently supports only 1D and 2D batchShapes, but received ${n.length}D.`)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Ou=as({floor_:function(e){const t={x:ts(e,"x","floor","float32")};return Ga.runKernel(pt,t)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Du=as({gather_:function(e,t,n=0,r=0){const a={x:ts(e,"x","gather"),indices:ts(t,"indices","gather","int32")},s={axis:n,batchDims:r};return Ga.runKernel(mt,a,s)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Ru=as({greater_:function(e,t){let n=ts(e,"a","greater","string_or_numeric"),r=ts(t,"b","greater","string_or_numeric");[n,r]=Ca(n,r),Yi(n.shape,r.shape);const a={a:n,b:r};return Ga.runKernel(gt,a)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Cu=as({greaterEqual_:function(e,t){let n=ts(e,"a","greaterEqual","string_or_numeric"),r=ts(t,"b","greaterEqual","string_or_numeric");[n,r]=Ca(n,r),Yi(n.shape,r.shape);const a={a:n,b:r};return Ga.runKernel(yt,a)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Fu=as({imag_:function(e){const t={input:ts(e,"input","imag")};return Ga.runKernel(xt,t)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Bu=as({isFinite_:function(e){const t={x:ts(e,"x","isFinite")};return Ga.runKernel(Nt,t)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const zu=as({isInf_:function(e){const t={x:ts(e,"x","isInf")};return Ga.runKernel(St,t)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Lu=as({isNaN_:function(e){const t={x:ts(e,"x","isNaN")};return Ga.runKernel(vt,t)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Pu=as({leakyRelu_:function(e,t=.2){const n={x:ts(e,"x","leakyRelu")},r={alpha:t};return Ga.runKernel(Tt,n,r)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Vu=as({less_:function(e,t){let n=ts(e,"a","less","string_or_numeric"),r=ts(t,"b","less","string_or_numeric");[n,r]=Ca(n,r),Yi(n.shape,r.shape);const a={a:n,b:r};return Ga.runKernel(kt,a)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Uu=as({lessEqual_:function(e,t){let n=ts(e,"a","lessEqual","string_or_numeric"),r=ts(t,"b","lessEqual","string_or_numeric");[n,r]=Ca(n,r),Yi(n.shape,r.shape);const a={a:n,b:r};return Ga.runKernel(Et,a)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ju(e,t,n){if(n<=0)throw new Error("The number of values should be positive.");const r={start:e,stop:t,num:n};return Ga.runKernel(_t,{},r)}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Wu=as({localResponseNormalization_:function(e,t=5,n=1,r=1,a=.5){const s=ts(e,"x","localResponseNormalization");p(4===s.rank||3===s.rank,()=>`Error in localResponseNormalization: x must be rank 3 or 4 but got\n               rank ${s.rank}.`),p(y(t),()=>`Error in localResponseNormalization: depthRadius must be an integer but got depthRadius ${t}.`);let o=s,i=!1;3===s.rank&&(i=!0,o=li(s,[1,s.shape[0],s.shape[1],s.shape[2]]));const u={x:o},l={depthRadius:t,bias:n,alpha:r,beta:a},c=Ga.runKernel(Ft,u,l);return i?li(c,[c.shape[1],c.shape[2],c.shape[3]]):c}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Gu=as({log_:function(e){const t={x:ts(e,"x","log","float32")};return Ga.runKernel(It,t)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const qu=as({log1p_:function(e){const t={x:ts(e,"x","log1p")};return Ga.runKernel(At,t)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ku(e){return p(C(e),()=>"The f passed in grad(f) must be a function"),(t,n)=>{const r=ts(t,"x","tf.grad","string_or_numeric"),a=null!=n?ts(n,"dy","tf.grad"):null;return Ga.tidy(()=>{const{value:t,grads:n}=Ga.gradients(()=>e(r),[r],a);return null!=a&&d(t.shape,a.shape,"The shape of dy passed in grad(f)(x, dy) must match the shape returned by f(x)"),Qu(n),n[0]})}}function Hu(e){return p(C(e),()=>"The f passed in grads(f) must be a function"),(t,n)=>{p(Array.isArray(t),()=>"The args passed in grads(f)(args) must be an array of `Tensor`s or `TensorLike`s");const r=ns(t,"args","tf.grads","string_or_numeric"),a=null!=n?ts(n,"dy","tf.grads"):null;return Ga.tidy(()=>{const{value:t,grads:n}=Ga.gradients(()=>e(...r),r,a);return null!=a&&d(t.shape,a.shape,"The shape of dy passed in grads(f)([x1,...], dy) must match the shape returned by f([x1,...])"),Qu(n),n})}}function Zu(e){return p(C(e),()=>"The f passed in valueAndGrad(f) must be a function"),(t,n)=>{p(t instanceof ya,()=>"The x passed in valueAndGrad(f)(x) must be a tensor"),p(null==n||n instanceof ya,()=>"The dy passed in valueAndGrad(f)(x, dy) must be a tensor");const{grads:r,value:a}=Ga.gradients(()=>e(t),[t],n);return Qu(r),{grad:r[0],value:a}}}function Ju(e){return p(C(e),()=>"The f passed in valueAndGrads(f) must be a function"),(t,n)=>{p(Array.isArray(t)&&t.every(e=>e instanceof ya),()=>"The args passed in valueAndGrads(f)(args) must be array of tensors"),p(null==n||n instanceof ya,()=>"The dy passed in valueAndGrads(f)(args, dy) must be a tensor");const r=Ga.gradients(()=>e(...t),t,n);return null!=n&&d(r.value.shape,n.shape,"The shape of dy passed in valueAndGrads(f)([x1,...], dy) must match the shape returned by f([x1,...])"),Qu(r.grads),r}}function Xu(e,t){p(C(e),()=>"The f passed in variableGrads(f) must be a function"),p(null==t||Array.isArray(t)&&t.every(e=>e instanceof wa),()=>"The varList passed in variableGrads(f, varList) must be an array of variables");const n=null!=t;if(!n){t=[];for(const e in Ga.registeredVariables)t.push(Ga.registeredVariables[e])}const r=n?t.filter(e=>!e.trainable):null,a=t.length;p((t=t.filter(e=>e.trainable)).length>0,()=>`variableGrads() expects at least one of the input variables to be trainable, but none of the ${a} variables is trainable.`);const{value:s,grads:o}=Ga.gradients(e,t,null,!0);p(o.some(e=>null!=e),()=>"Cannot find a connection between any variable and the result of the loss function y=f(x). Please make sure the operations that use variables are inside the function f passed to minimize()."),p(0===s.rank,()=>`The f passed in variableGrads(f) must return a scalar, but it returned a rank-${s.rank} tensor`);const i={};return t.forEach((e,t)=>{null!=o[t]&&(i[e.name]=o[t])}),null!=r&&r.forEach(e=>i[e.name]=null),{value:s,grads:i}}function Yu(e){return Ga.customGrad(e)}function Qu(e){if(e.filter(e=>null==e).length>0)throw new Error("Cannot compute gradient of y=f(x) with respect to x. Make sure that\n    the f you passed encloses all operations that lead from x to y.")}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const el=as({neg_:function(e){const t={x:ts(e,"x","neg")};return Ga.runKernel(Qt,t)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const tl=as({softplus_:function(e){const t={x:ts(e,"x","softplus")};return Ga.runKernel(Ln,t)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const nl=as({logSigmoid_:function(e){const t=ts(e,"x","logSigmoid");return Yu(e=>({value:el(tl(el(e))),gradFunc:t=>Ro(t,mi(el(e)))}))(t)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const rl=as({sub_:function(e,t){let n=ts(e,"a","sub"),r=ts(t,"b","sub");[n,r]=Ca(n,r);const a={a:n,b:r};return Ga.runKernel(rr,a)}});
/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const al=as({logSoftmax_:function(e,t=-1){const n=ts(e,"logits","logSoftmax");if(-1===t&&(t=n.rank-1),t!==n.rank-1)throw Error(`Log Softmax along a non-last dimension is not yet supported. Logits was rank ${n.rank} and axis was ${t}`);return Yu((e,n)=>{const r=yu(e,t,!0),a=rl(e,r),s=rl(Io(a,"float32"),Gu(vu(_u(a),t,!0)));n([s]);return{value:s,gradFunc:(e,n)=>{const[r]=n,a=_u(r);return rl(e,Ro(vu(e,t,!0),a))}}})(n)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const sl=as({logSumExp_:function(e,t=null,n=!1){const r=ts(e,"x","logSumExp"),a=S(t,r.shape),s=yu(r,a,!0),o=rl(r,s),i=_u(o),u=vu(i,a),l=Gu(u),c=$o(li(s,l.shape),l);if(n){const e=du(c.shape,a);return li(c,e)}return c}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const ol=as({logicalAnd_:function(e,t){const n=ts(e,"a","logicalAnd","bool"),r=ts(t,"b","logicalAnd","bool");Yi(n.shape,r.shape);const a={a:n,b:r};return Ga.runKernel(Mt,a)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const il=as({logicalNot_:function(e){const t={x:ts(e,"x","logicalNot","bool")};return Ga.runKernel($t,t)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const ul=as({logicalOr_:function(e,t){const n=ts(e,"a","logicalOr","bool"),r=ts(t,"b","logicalOr","bool");Yi(n.shape,r.shape);const a={a:n,b:r};return Ga.runKernel(Ot,a)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const ll=as({logicalXor_:function(e,t){const n=ts(e,"a","logicalXor","bool"),r=ts(t,"b","logicalXor","bool");return Yi(n.shape,r.shape),ol(ul(e,t),il(ol(e,t)))}}),cl=2147483648;
/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const pl=as({searchSorted_:function(e,t,n="left"){const r=ts(e,"sortedSequence","searchSorted"),a=ts(t,"values","searchSorted"),s=r.shape[r.shape.length-1],o=a.shape[a.shape.length-1],i=li(r,[-1,s]),u=li(a,[-1,o]);if(i.rank<2)throw new Error("Sorted input argument must be at least 2-dimensional");if(i.shape[0]!==u.shape[0])throw new Error("Leading dimension of 'sortedSequence' and 'values' must match.");if(m(u.shape)>=cl)throw new Error("values tensor size must less than 2147483648");if(i.shape[1]>=cl)throw new Error(`trailing dim_size must less than 2147483648 for int32 output type, was ${i.shape[1]}`);const l={sortedSequence:i,values:u},c={side:n};return Ga.runKernel($n,l,c)}});
/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function dl(e,t){return pl(e,t,"left")}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const hl=as({maxPool_:function(e,t,n,r,a){const s=ts(e,"x","maxPool");let o=s,i=!1;3===s.rank&&(i=!0,o=li(s,[1,s.shape[0],s.shape[1],s.shape[2]])),p(4===o.rank,()=>`Error in maxPool: input must be rank 4 but got rank ${o.rank}.`),p(si(n,1),()=>`Error in maxPool: Either strides or dilations must be 1. Got strides ${n} and dilations '1'`),ui("maxPool",r,a);const u={x:o},l={filterSize:t,strides:n,pad:r,dimRoundingMode:a},c=Ga.runKernel(Vt,u,l);return i?li(c,[c.shape[1],c.shape[2],c.shape[3]]):c}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const ml=as({maxPool3d_:function(e,t=[1,1,1],n,r,a,s="NDHWC"){const o=ts(e,"x","maxPool3d");let i=o,u=!1;4===o.rank&&(u=!0,i=li(o,[1,o.shape[0],o.shape[1],o.shape[2],o.shape[3]])),p(5===i.rank,()=>`Error in maxPool3d: x must be rank 5 but got rank ${i.rank}.`),p("NDHWC"===s,()=>`Error in maxPool3d: Only NDHWC is currently supported, but got dataFormat of ${s}`),ui("maxPool3d",r,a);const l={x:i},c={filterSize:t,strides:n,pad:r,dimRoundingMode:a,dataFormat:s},d=Ga.runKernel(jt,l,c);return u?li(d,[d.shape[1],d.shape[2],d.shape[3],d.shape[4]]):d}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const fl=as({maxPoolWithArgmax_:function(e,t,n,r,a=!1){const s={x:ts(e,"x","maxPoolWithArgmax")},o={filterSize:t,strides:n,pad:r,includeBatchInIndex:a},i=Ga.runKernel(Gt,s,o);return{result:i[0],indexes:i[1]}}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const gl=as({maximum_:function(e,t){let n=ts(e,"a","maximum"),r=ts(t,"b","maximum");[n,r]=Ca(n,r),"bool"===n.dtype&&(n=Io(n,"int32"),r=Io(r,"int32")),Yi(n.shape,r.shape);const a={a:n,b:r};return Ga.runKernel(Pt,a)}});
/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const yl=as({mean_:function(e,t=null,n=!1){const r={x:ts(e,"x","mean")},a={axis:t,keepDims:n};return Ga.runKernel(qt,r,a)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function bl(e,t="float32"){if(W(e),"complex64"===t){const t=bl(e,"float32"),n=bl(e,"float32");return ss(t,n)}const n=U(m(e),t);return Ga.makeTensor(n,e,t)}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function wl(e,t="float32"){if(W(e),"complex64"===t){const t=wl(e,"float32"),n=bl(e,"float32");return ss(t,n)}const n=V(m(e),t);return Ga.makeTensor(n,e,t)}
/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function xl(e,t,{indexing:n="xy"}={}){if("xy"!==n&&"ij"!==n)throw new TypeError(`${n} is not a valid third argument to meshgrid`);if(void 0===e)return[];let r=ts(e,"x","meshgrid",e instanceof ya?e.dtype:"float32");if(void 0===t)return[r];let a=ts(t,"y","meshgrid",t instanceof ya?t.dtype:"float32");const s=m(r.shape),o=m(a.shape);return"xy"===n?(r=li(r,[1,-1]),a=li(a,[-1,1]),[hi(wl([o,1],r.dtype),r),hi(a,wl([1,s],a.dtype))]):(r=li(r,[-1,1]),a=li(a,[1,-1]),[hi(r,wl([1,o],r.dtype)),hi(wl([s,1],a.dtype),a)])}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Nl=as({minimum_:function(e,t){let n=ts(e,"a","minimum"),r=ts(t,"b","minimum");[n,r]=Ca(n,r),"bool"===n.dtype&&(n=Io(n,"int32"),r=Io(r,"int32")),Yi(n.shape,r.shape);const a={a:n,b:r};return Ga.runKernel(Ht,a)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Sl=as({mirrorPad_:function(e,t,n){p("reflect"===n||"symmetric"===n,()=>`Invalid mode. Mode must be either reflect or symmetric. Got ${n}.`);const r=ts(e,"x","mirrorPad");if(0===r.rank)throw new Error("mirrorPad(scalar) is not defined. Pass non-scalar to mirrorPad");p(t.length===r.rank,()=>`Padding doesn't match input. Must be ${r.rank}. Got ${t.length}.`);const a="reflect"===n?1:0;for(let i=0;i<r.rank;i++)p(2===t[i].length,()=>"Invalid number of paddings. Must be length of 2 each."),p(t[i][0]>=0&&t[i][0]<=r.shape[i]-a&&t[i][1]>=0&&t[i][1]<=r.shape[i]-a,()=>`Padding in dimension ${i} cannot be greater than or equal to ${r.shape[i]-a} or less than 0 for input of shape ${r.shape}`);const s={paddings:t,mode:n},o={x:r};return Ga.runKernel(Zt,o,s)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const vl=as({mod_:function(e,t){let n=ts(e,"a","mod"),r=ts(t,"b","mod");[n,r]=Ca(n,r);const a={a:n,b:r};return Ga.runKernel(Jt,a)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Tl=as({moments_:function(e,t=null,n=!1){const r=S(t,(e=ts(e,"x","moments")).shape),a=yl(e,r,n);let s=a.shape;n||(s=du(a.shape,r));const o=Su(rl(Io(e,"float32"),li(a,s)));return{mean:a,variance:yl(o,r,n)}}});const kl=as({multiRNNCell_:function(e,t,n,r){const a=ts(t,"data","multiRNNCell"),s=ns(n,"c","multiRNNCell"),o=ns(r,"h","multiRNNCell");let i=a;const u=[];for(let p=0;p<e.length;p++){const t=e[p](i,s[p],o[p]);u.push(t[0]),u.push(t[1]),i=t[1]}const l=[],c=[];for(let p=0;p<u.length;p+=2)l.push(u[p]),c.push(u[p+1]);return[l,c]}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const El=as({multinomial_:function(e,t,n,r=!1){const a=ts(e,"logits","multinomial"),s=a.size,o=a.rank;if(s<2)throw new Error(`Error in multinomial: you need at least 2 outcomes, but got ${s}.`);if(o>2)throw new Error(`Rank of probabilities must be 1 or 2, but is ${o}`);n=n||Math.random();const i={logits:1===o?li(a,[1,-1]):a},u={numSamples:t,seed:n,normalized:r},l=Ga.runKernel(Xt,i,u);return 1===o?li(l,[l.size]):l}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const _l=as({notEqual_:function(e,t){let n=ts(e,"a","notEqual","string_or_numeric"),r=ts(t,"b","notEqual","string_or_numeric");[n,r]=Ca(n,r),Yi(n.shape,r.shape);const a={a:n,b:r};return Ga.runKernel(en,a)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Il=as({oneHot_:function(e,t,n=1,r=0,a="int32"){if(t<2)throw new Error(`Error in oneHot: depth must be >=2, but it is ${t}`);const s={indices:ts(e,"indices","oneHot","int32")},o={dtype:a,depth:t,onValue:n,offValue:r};return Ga.runKernel(sn,s,o)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Al=as({onesLike_:function(e){const t={x:ts(e,"x","onesLike")};return Ga.runKernel(an,t)}});const Ml=as({outerProduct_:function(e,t){const n=ts(e,"v1","outerProduct"),r=ts(t,"v2","outerProduct");p(1===n.rank&&1===r.rank,()=>`Error in outerProduct: inputs must be rank 1, but got ranks ${n.rank} and ${r.rank}.`);const a=li(n,[-1,1]),s=li(r,[1,-1]);return hi(a,s)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const $l=as({pad_:function(e,t,n=0){const r=ts(e,"x","pad");if(0===r.rank)throw new Error("pad(scalar) is not defined. Pass non-scalar to pad");const a={paddings:t,constantValue:n},s={x:r};return Ga.runKernel(un,s,a)}});const Ol=as({pad1d_:function(e,t,n=0){return p(2===t.length,()=>"Invalid number of paddings. Must be length of 2."),$l(e,[t],n)}});const Dl=as({pad2d_:function(e,t,n=0){return p(2===t.length&&2===t[0].length&&2===t[1].length,()=>"Invalid number of paddings. Must be length of 2 each."),$l(e,t,n)}});const Rl=as({pad3d_:function(e,t,n=0){return p(3===t.length&&2===t[0].length&&2===t[1].length&&2===t[2].length,()=>"Invalid number of paddings. Must be length of 2 each."),$l(e,t,n)}});const Cl=as({pad4d_:function(e,t,n=0){return p(4===t.length&&2===t[0].length&&2===t[1].length&&2===t[2].length&&2===t[3].length,()=>"Invalid number of paddings. Must be length of 2 each."),$l(e,t,n)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Fl=as({spaceToBatchND_:function(e,t,n){const r=ts(e,"x","spaceToBatchND");p(r.rank>=1+t.length,()=>`input rank ${r.rank} should be > than [blockShape] ${t.length}`),p(n.length===t.length,()=>`paddings.shape[0] ${n.length} must be equal to [blockShape] ${t.length}`),p(r.shape.reduce((e,r,a)=>a>0&&a<=t.length?e&&(r+n[a-1][0]+n[a-1][1])%t[a-1]===0:e,!0),()=>`input spatial dimensions ${r.shape.slice(1)} with paddings ${n.toString()} must be divisible by blockShapes ${t.toString()}`);const a={x:r},s={blockShape:t,paddings:n};return Ga.runKernel(Un,a,s)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Bl=as({pool_:function(e,t,n,r,a,s,o){null==a&&(a=[1,1]),null==s&&(s=1),0===r&&(r="valid");const i=ts(e,"x","maxPool");let u=i,l=!1;3===i.rank&&(l=!0,u=li(i,[1,i.shape[0],i.shape[1],i.shape[2]])),p(si(s,a),()=>`Error in pool: Either strides or dilations must be 1. Got strides ${s} and dilations '${a}'`);const c=Zo(u.shape,t,s,a,r),d=[c.dilationHeight,c.dilationWidth];let h;h="same"===r?function(e,t){const n=e.map((e,n)=>e+(e-1)*(t[n]-1)),r=n.map(e=>e-1),a=r.map(e=>Math.floor(e/2)),s=r.map((e,t)=>e-a[t]);return r.map((e,t)=>[a[t],s[t]])}([c.filterHeight,c.filterWidth],d):[[0,0],[0,0]];const m=1===d[0]&&1===d[1],[f,g]=function(e,t,n){const r=n.map(e=>e[0]),a=n.map(e=>e[1]),s=e.concat(r,a),o=t.map((e,t)=>(e-s[t]%e)%e),i=a.map((e,t)=>e+o[t]),u=t.map((e,t)=>[r[t],i[t]]),l=t.map((e,t)=>[0,o[t]]);return[u,l]}([c.inHeight,c.inWidth],d,h),y=m?r:"valid",b=m?u:Fl(u,d,f),w=("avg"===n?()=>ci(b,t,s,y,o):()=>hl(b,t,s,y,o))(),x=m?w:bi(w,d,g);return l?li(x,[x.shape[1],x.shape[2],x.shape[3]]):x}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const zl=as({prelu_:function(e,t){const n={x:ts(e,"x","prelu"),alpha:ts(t,"alpha","prelu")};return Ga.runKernel(pn,n)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Ll=as({prod_:function(e,t=null,n=!1){let r=ts(e,"x","prod");"bool"===r.dtype&&(r=Io(r,"int32"));const a={x:r},s={axis:t,keepDims:n};return Ga.runKernel(dn,a,s)}});
/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Pl=as({raggedGather_:function(e,t,n,r){const a={paramsNestedSplits:e.map((e,t)=>ts(e,`tensors${t}`,"raggedGather","int32")),paramsDenseValues:ts(t,"paramsDenseValues","raggedGather"),indices:ts(n,"indices","raggedGather","int32")},s={outputRaggedRank:r},o=Ga.runKernel(hn,a,s);return{outputNestedSplits:o.slice(0,o.length-1),outputDenseValues:o[o.length-1]}}});
/**
 * @license
 * Copyright 2022 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Vl=as({raggedRange_:function(e,t,n){const r=ts(e,"starts","raggedRange"),a={starts:r,limits:ts(t,"limits","raggedRange",r.dtype),deltas:ts(n,"deltas","raggedRange",r.dtype)},s=Ga.runKernel(mn,a);return{rtNestedSplits:s[0],rtDenseValues:s[1]}}});
/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Ul=as({raggedTensorToTensor_:function(e,t,n,r,a){const s=ts(e,"shape","raggedTensorToTensor","int32"),o=ts(t,"values","raggedTensorToTensor"),i={shape:s,values:o,defaultValue:ts(n,"defaultValue","raggedTensorToTensor",o.dtype),rowPartitionTensors:r.map((e,t)=>ts(e,`tensors${t}`,"raggedTensorToTensor","int32"))},u={rowPartitionTypes:a};return Ga.runKernel(fn,i,u)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const jl=as({rand_:function(e,t,n){W(e);const r=m(e);let a=null;if(null==n||"float32"===n)a=new Float32Array(r);else if("int32"===n)a=new Int32Array(r);else{if("bool"!==n)throw new Error(`Unknown data type ${n}`);a=new Uint8Array(r)}for(let s=0;s<r;s++)a[s]=t();return Ga.makeTensor(a,e,n)}});var Wl,Gl={exports:{}};function ql(){return Wl||(Wl=1,function(e,t){function n(e){var t=this,n=function(){var e=4022871197,t=function(t){t=String(t);for(var n=0;n<t.length;n++){var r=.02519603282416938*(e+=t.charCodeAt(n));r-=e=r>>>0,e=(r*=e)>>>0,e+=4294967296*(r-=e)}return 2.3283064365386963e-10*(e>>>0)};return t}();t.next=function(){var e=2091639*t.s0+2.3283064365386963e-10*t.c;return t.s0=t.s1,t.s1=t.s2,t.s2=e-(t.c=0|e)},t.c=1,t.s0=n(" "),t.s1=n(" "),t.s2=n(" "),t.s0-=n(e),t.s0<0&&(t.s0+=1),t.s1-=n(e),t.s1<0&&(t.s1+=1),t.s2-=n(e),t.s2<0&&(t.s2+=1),n=null}function r(e,t){return t.c=e.c,t.s0=e.s0,t.s1=e.s1,t.s2=e.s2,t}function a(e,t){var a=new n(e),s=t&&t.state,o=a.next;return o.int32=function(){return 4294967296*a.next()|0},o.double=function(){return o()+11102230246251565e-32*(2097152*o()|0)},o.quick=o,s&&("object"==typeof s&&r(s,a),o.state=function(){return r(a,{})}),o}t&&t.exports?t.exports=a:this.alea=a}(0,Gl)),Gl.exports}var Kl,Hl={exports:{}};var Zl,Jl={exports:{}};var Xl,Yl={exports:{}};var Ql,ec={exports:{}};var tc,nc={exports:{}};var rc={exports:{}};const ac=t(Object.freeze(Object.defineProperty({__proto__:null,default:{}},Symbol.toStringTag,{value:"Module"})));var sc,oc,ic,uc=rc.exports;function lc(){return sc||(sc=1,e=rc,function(t,n,r){var a,s=256,o="random",i=r.pow(s,6),u=r.pow(2,52),l=2*u,c=255;function p(e,c,p){var y=[],b=f(m((c=1==c?{entropy:!0}:c||{}).entropy?[e,g(n)]:null==e?function(){try{var e;return a&&(e=a.randomBytes)?e=e(s):(e=new Uint8Array(s),(t.crypto||t.msCrypto).getRandomValues(e)),g(e)}catch(i){var r=t.navigator,o=r&&r.plugins;return[+new Date,t,o,t.screen,g(n)]}}():e,3),y),w=new d(y),x=function(){for(var e=w.g(6),t=i,n=0;e<u;)e=(e+n)*s,t*=s,n=w.g(1);for(;e>=l;)e/=2,t/=2,n>>>=1;return(e+n)/t};return x.int32=function(){return 0|w.g(4)},x.quick=function(){return w.g(4)/4294967296},x.double=x,f(g(w.S),n),(c.pass||p||function(e,t,n,a){return a&&(a.S&&h(a,w),e.state=function(){return h(w,{})}),n?(r[o]=e,t):e})(x,b,"global"in c?c.global:this==r,c.state)}function d(e){var t,n=e.length,r=this,a=0,o=r.i=r.j=0,i=r.S=[];for(n||(e=[n++]);a<s;)i[a]=a++;for(a=0;a<s;a++)i[a]=i[o=c&o+e[a%n]+(t=i[a])],i[o]=t;(r.g=function(e){for(var t,n=0,a=r.i,o=r.j,i=r.S;e--;)t=i[a=c&a+1],n=n*s+i[c&(i[a]=i[o=c&o+t])+(i[o]=t)];return r.i=a,r.j=o,n})(s)}function h(e,t){return t.i=e.i,t.j=e.j,t.S=e.S.slice(),t}function m(e,t){var n,r=[],a=typeof e;if(t&&"object"==a)for(n in e)try{r.push(m(e[n],t-1))}catch(s){}return r.length?r:"string"==a?e:e+"\0"}function f(e,t){for(var n,r=e+"",a=0;a<r.length;)t[c&a]=c&(n^=19*t[c&a])+r.charCodeAt(a++);return g(t)}function g(e){return String.fromCharCode.apply(0,e)}if(f(r.random(),n),e.exports){e.exports=p;try{a=ac}catch(y){}}else r["seed"+o]=p}("undefined"!=typeof self?self:uc,[],Math)),rc.exports;var e}var cc=function(){if(ic)return oc;ic=1;var e=ql(),t=(Kl||(Kl=1,function(e,t){function n(e){var t=this,n="";t.x=0,t.y=0,t.z=0,t.w=0,t.next=function(){var e=t.x^t.x<<11;return t.x=t.y,t.y=t.z,t.z=t.w,t.w^=t.w>>>19^e^e>>>8},e===(0|e)?t.x=e:n+=e;for(var r=0;r<n.length+64;r++)t.x^=0|n.charCodeAt(r),t.next()}function r(e,t){return t.x=e.x,t.y=e.y,t.z=e.z,t.w=e.w,t}function a(e,t){var a=new n(e),s=t&&t.state,o=function(){return(a.next()>>>0)/4294967296};return o.double=function(){do{var e=((a.next()>>>11)+(a.next()>>>0)/4294967296)/(1<<21)}while(0===e);return e},o.int32=a.next,o.quick=o,s&&("object"==typeof s&&r(s,a),o.state=function(){return r(a,{})}),o}t&&t.exports?t.exports=a:this.xor128=a}(0,Hl)),Hl.exports),n=(Zl||(Zl=1,function(e,t){function n(e){var t=this,n="";t.next=function(){var e=t.x^t.x>>>2;return t.x=t.y,t.y=t.z,t.z=t.w,t.w=t.v,(t.d=t.d+362437|0)+(t.v=t.v^t.v<<4^e^e<<1)|0},t.x=0,t.y=0,t.z=0,t.w=0,t.v=0,e===(0|e)?t.x=e:n+=e;for(var r=0;r<n.length+64;r++)t.x^=0|n.charCodeAt(r),r==n.length&&(t.d=t.x<<10^t.x>>>4),t.next()}function r(e,t){return t.x=e.x,t.y=e.y,t.z=e.z,t.w=e.w,t.v=e.v,t.d=e.d,t}function a(e,t){var a=new n(e),s=t&&t.state,o=function(){return(a.next()>>>0)/4294967296};return o.double=function(){do{var e=((a.next()>>>11)+(a.next()>>>0)/4294967296)/(1<<21)}while(0===e);return e},o.int32=a.next,o.quick=o,s&&("object"==typeof s&&r(s,a),o.state=function(){return r(a,{})}),o}t&&t.exports?t.exports=a:this.xorwow=a}(0,Jl)),Jl.exports),r=(Xl||(Xl=1,function(e,t){function n(e){var t=this;t.next=function(){var e,n,r=t.x,a=t.i;return e=r[a],n=(e^=e>>>7)^e<<24,n^=(e=r[a+1&7])^e>>>10,n^=(e=r[a+3&7])^e>>>3,n^=(e=r[a+4&7])^e<<7,e=r[a+7&7],n^=(e^=e<<13)^e<<9,r[a]=n,t.i=a+1&7,n},function(e,t){var n,r=[];if(t===(0|t))r[0]=t;else for(t=""+t,n=0;n<t.length;++n)r[7&n]=r[7&n]<<15^t.charCodeAt(n)+r[n+1&7]<<13;for(;r.length<8;)r.push(0);for(n=0;n<8&&0===r[n];++n);for(8==n?r[7]=-1:r[n],e.x=r,e.i=0,n=256;n>0;--n)e.next()}(t,e)}function r(e,t){return t.x=e.x.slice(),t.i=e.i,t}function a(e,t){null==e&&(e=+new Date);var a=new n(e),s=t&&t.state,o=function(){return(a.next()>>>0)/4294967296};return o.double=function(){do{var e=((a.next()>>>11)+(a.next()>>>0)/4294967296)/(1<<21)}while(0===e);return e},o.int32=a.next,o.quick=o,s&&(s.x&&r(s,a),o.state=function(){return r(a,{})}),o}t&&t.exports?t.exports=a:this.xorshift7=a}(0,Yl)),Yl.exports),a=(Ql||(Ql=1,function(e,t){function n(e){var t=this;t.next=function(){var e,n,r=t.w,a=t.X,s=t.i;return t.w=r=r+1640531527|0,n=a[s+34&127],e=a[s=s+1&127],n^=n<<13,e^=e<<17,n^=n>>>15,e^=e>>>12,n=a[s]=n^e,t.i=s,n+(r^r>>>16)|0},function(e,t){var n,r,a,s,o,i=[],u=128;for(t===(0|t)?(r=t,t=null):(t+="\0",r=0,u=Math.max(u,t.length)),a=0,s=-32;s<u;++s)t&&(r^=t.charCodeAt((s+32)%t.length)),0===s&&(o=r),r^=r<<10,r^=r>>>15,r^=r<<4,r^=r>>>13,s>=0&&(o=o+1640531527|0,a=0==(n=i[127&s]^=r+o)?a+1:0);for(a>=128&&(i[127&(t&&t.length||0)]=-1),a=127,s=512;s>0;--s)r=i[a+34&127],n=i[a=a+1&127],r^=r<<13,n^=n<<17,r^=r>>>15,n^=n>>>12,i[a]=r^n;e.w=o,e.X=i,e.i=a}(t,e)}function r(e,t){return t.i=e.i,t.w=e.w,t.X=e.X.slice(),t}function a(e,t){null==e&&(e=+new Date);var a=new n(e),s=t&&t.state,o=function(){return(a.next()>>>0)/4294967296};return o.double=function(){do{var e=((a.next()>>>11)+(a.next()>>>0)/4294967296)/(1<<21)}while(0===e);return e},o.int32=a.next,o.quick=o,s&&(s.X&&r(s,a),o.state=function(){return r(a,{})}),o}t&&t.exports?t.exports=a:this.xor4096=a}(0,ec)),ec.exports),s=(tc||(tc=1,function(e,t){function n(e){var t=this,n="";t.next=function(){var e=t.b,n=t.c,r=t.d,a=t.a;return e=e<<25^e>>>7^n,n=n-r|0,r=r<<24^r>>>8^a,a=a-e|0,t.b=e=e<<20^e>>>12^n,t.c=n=n-r|0,t.d=r<<16^n>>>16^a,t.a=a-e|0},t.a=0,t.b=0,t.c=-1640531527,t.d=1367130551,e===Math.floor(e)?(t.a=e/4294967296|0,t.b=0|e):n+=e;for(var r=0;r<n.length+20;r++)t.b^=0|n.charCodeAt(r),t.next()}function r(e,t){return t.a=e.a,t.b=e.b,t.c=e.c,t.d=e.d,t}function a(e,t){var a=new n(e),s=t&&t.state,o=function(){return(a.next()>>>0)/4294967296};return o.double=function(){do{var e=((a.next()>>>11)+(a.next()>>>0)/4294967296)/(1<<21)}while(0===e);return e},o.int32=a.next,o.quick=o,s&&("object"==typeof s&&r(s,a),o.state=function(){return r(a,{})}),o}t&&t.exports?t.exports=a:this.tychei=a}(0,nc)),nc.exports),o=lc();return o.alea=e,o.xor128=t,o.xorwow=n,o.xorshift7=r,o.xor4096=a,o.tychei=s,oc=o}();
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function pc(){return 32===Ga.backend.floatPrecision()?.001:.1}function dc(e,t,n){let r=!0;if((ra(e)||ra(t))&&(r=!1),ra(e)&&ra(t)&&(r=!0),r){const n=e.constructor.name,r=t.constructor.name;if(n!==r)throw new Error(`Arrays are of different type. Actual: ${n}. Expected: ${r}`)}if(Array.isArray(e)&&Array.isArray(t)){const n=Ya(e),r=Ya(t);if(!g(n,r))throw new Error(`Arrays have different shapes. Actual: [${n}]. Expected: [${r}]`)}const a=ra(e)?e:aa(e),s=ra(t)?t:aa(t);if(a.length!==s.length)throw new Error(`Arrays have different lengths actual: ${a.length} vs expected: ${s.length}.\nActual:   ${a}.\nExpected: ${s}.`);for(let o=0;o<s.length;++o){const e=a[o],t=s[o];if(!n(e,t))throw new Error(`Arrays differ: actual[${o}] = ${e}, expected[${o}] = ${t}.\nActual:   ${a}.\nExpected: ${s}.`)}"undefined"!=typeof expect&&expect().nothing()}function hc(e,t,n){return!isFinite(e)&&!isFinite(t)||!(isNaN(e)||isNaN(t)||Math.abs(e-t)>n)}const mc=Object.freeze(Object.defineProperty({__proto__:null,TEST_EPSILON_FLOAT16:.1,createVideoElement:function(e){const t=document.createElement("video");return"playsInline"in t&&(t.playsInline=!0),t.muted=!0,t.loop=!0,t.style.position="fixed",t.style.left="0px",t.style.top="0px",t.preload="auto",t.appendChild(e),new Promise(e=>{t.addEventListener("loadeddata",n=>e(t)),t.load()})},encodeStrings:function e(t){for(let n=0;n<t.length;n++){const r=t[n];Array.isArray(r)?e(r):t[n]=ta(r)}return t},expectArrayBuffersEqual:function(e,t){const n=new Float32Array(e),r=new Float32Array(t);if(n.length!==r.length)throw new Error(`Expected ArrayBuffer to be of length ${r.length}, but it was ${n.length}`);for(let a=0;a<r.length;a++)if(n[a]!==r[a])throw new Error(`Expected ArrayBuffer value at ${a} to be ${r[a]} but got ${n[a]} instead`)},expectArraysClose:function(e,t,n){return null==n&&(n=pc()),dc(e,t,(e,t)=>hc(e,t,n))},expectArraysEqual:function(e,t){const n="string"==typeof t||"number"==typeof t||"boolean"==typeof t?[t]:t;return $(e)||$(e[0])||$(t)||$(t[0])?dc(e,n,(e,t)=>e==t):dc(e,t,(e,t)=>hc(e,t,0))},expectNumbersClose:function(e,t,n){if(null==n&&(n=pc()),!hc(e,t,n))throw new Error(`Numbers differ: actual === ${e}, expected === ${t}`);"undefined"!=typeof expect&&expect().nothing()},expectPromiseToFail:function(e,t){e().then(()=>t.fail(),()=>t()),"undefined"!=typeof expect&&expect().nothing()},expectValuesInRange:function(e,t,n){for(let r=0;r<e.length;r++)if(e[r]<t||e[r]>n)throw new Error(`Value out of range:${e[r]} low: ${t}, high: ${n}`)},play:async function(e){await e.play(),"requestVideoFrameCallback"in e&&await new Promise(t=>{e.requestVideoFrameCallback(t)})},testEpsilon:pc},Symbol.toStringTag,{value:"Module"}));
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class fc{constructor(e,t,n,r,a){this.mean=e,this.stdDev=t,this.dtype=n,this.nextVal=NaN,this.truncated=r,this.truncated&&(this.upper=this.mean+2*this.stdDev,this.lower=this.mean-2*this.stdDev);const s=a||Math.random();this.random=cc.alea(s.toString())}nextValue(){if(!isNaN(this.nextVal)){const e=this.nextVal;return this.nextVal=NaN,e}let e,t,n=!1;for(;!n;){let r,a,s;do{r=2*this.random()-1,a=2*this.random()-1,s=r*r+a*a}while(s>=1||0===s);const o=Math.sqrt(-2*Math.log(s)/s);e=this.mean+this.stdDev*r*o,t=this.mean+this.stdDev*a*o,this.truncated&&!this.isValidTruncated(e)||(n=!0)}return this.truncated&&!this.isValidTruncated(t)||(this.nextVal=this.convertValue(t)),this.convertValue(e)}convertValue(e){return null==this.dtype||"float32"===this.dtype?e:Math.round(e)}isValidTruncated(e){return e<=this.upper&&e>=this.lower}}class gc{constructor(e,t,n,r){this.alpha=e,this.beta=1/t,this.dtype=n;const a=r||Math.random();this.randu=cc.alea(a.toString()),this.randn=new fc(0,1,n,!1,this.randu()),this.d=e<1?e+2/3:e-1/3,this.c=1/Math.sqrt(9*this.d)}nextValue(){let e,t,n,r,a,s;for(;;){do{r=this.randn.nextValue(),s=1+this.c*r}while(s<=0);if(s*=s*s,e=r*r,t=1-.331*e*e,n=.5*e+this.d*(1-s+Math.log(s)),a=this.randu(),a<t||Math.log(a)<n)break}return s=1/this.beta*this.d*s,this.alpha<1&&(s*=Math.pow(this.randu(),1/this.alpha)),this.convertValue(s)}convertValue(e){return"float32"===this.dtype?e:Math.round(e)}}class yc{constructor(e=0,t=1,n,r){if(this.canReturnFloat=()=>null==this.dtype||"float32"===this.dtype,this.min=e,this.range=t-e,this.dtype=n,null==r&&(r=Math.random()),"number"==typeof r&&(r=r.toString()),!this.canReturnFloat()&&this.range<=1)throw new Error(`The difference between ${e} - ${t} <= 1 and dtype is not float`);this.random=cc.alea(r)}convertValue(e){return this.canReturnFloat()?e:Math.round(e)}nextValue(){return this.convertValue(this.min+this.range*this.random())}}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const bc=as({randomGamma_:function(e,t,n=1,r="float32",a){if(W(e),null==n&&(n=1),null==r&&(r="float32"),"float32"!==r&&"int32"!==r)throw new Error(`Unsupported data type ${r}`);const s=new gc(t,n,r,a),o=_o(e,r);for(let i=0;i<o.values.length;i++)o.values[i]=s.nextValue();return o.toTensor()}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const wc=as({randomNormal_:function(e,t=0,n=1,r,a){if(W(e),null!=r&&"bool"===r)throw new Error(`Unsupported data type ${r}`);const s=new fc(t,n,r,!1,a),o=_o(e,r);for(let i=0;i<o.values.length;i++)o.values[i]=s.nextValue();return o.toTensor()}});
/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const xc=as({randomStandardNormal_:function(e,t,n){if(null!=t&&"bool"===t)throw new Error(`Unsupported data type ${t}`);return wc(e,0,1,t,n)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Nc=as({randomUniform_:function(e,t=0,n=1,r="float32",a){W(e);const s=_o(e,r),o=new yc(t,n,null,a);for(let i=0;i<s.values.length;i++)s.values[i]=o.nextValue();return s.toTensor()}});
/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Sc=as({randomUniformInt_:function(e,t,n,r){return Nc(e,t,n,"int32",r)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function vc(e,t,n=1,r="float32"){if(0===n)throw new Error("Cannot have a step of zero");const a={start:e,stop:t,step:n,dtype:r};return Ga.runKernel(gn,{},a)}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Tc=as({real_:function(e){const t={input:ts(e,"input","real")};return Ga.runKernel(yn,t)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const kc=as({reciprocal_:function(e){const t={x:ts(e,"x","reciprocal")};return Ga.runKernel(bn,t)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Ec=as({relu_:function(e){const t={x:ts(e,"x","relu")};return Ga.runKernel(wn,t)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const _c=as({relu6_:function(e){const t={x:ts(e,"x","relu6")};return Ga.runKernel(kn,t)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Ic=as({reverse_:function(e,t){const n={x:ts(e,"x","reverse")},r={dims:t};return Ga.runKernel(En,n,r)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Ac=as({reverse1d_:function(e){const t=ts(e,"x","reverse");return p(1===t.rank,()=>`Error in reverse1D: x must be rank 1 but got rank ${t.rank}.`),Ic(t,0)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Mc=as({reverse2d_:function(e,t){const n=ts(e,"x","reverse");return p(2===n.rank,()=>`Error in reverse2D: x must be rank 2 but got rank ${n.rank}.`),Ic(n,t)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const $c=as({reverse3d_:function(e,t){const n=ts(e,"x","reverse");return p(3===n.rank,()=>`Error in reverse3D: x must be rank 3 but got rank ${n.rank}.`),Ic(n,t)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Oc=as({reverse4d_:function(e,t){const n=ts(e,"x","reverse");return p(4===n.rank,()=>`Error in reverse4D: x must be rank 4 but got rank ${n.rank}.`),Ic(n,t)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Dc=as({round_:function(e){const t={x:ts(e,"x","round")};return Ga.runKernel(_n,t)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Rc=as({rsqrt_:function(e){const t={x:ts(e,"x","rsqrt","float32")};return Ga.runKernel(In,t)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Cc=as({selu_:function(e){const t={x:ts(e,"x","selu")};return Ga.runKernel(Dn,t)}});const Fc=as({separableConv2d_:function(e,t,n,r,a,s=[1,1],o="NHWC"){const i=ts(e,"x","separableConv2d"),u=ts(t,"depthwiseFilter","separableConv2d"),l=ts(n,"pointwiseFilter","separableConv2d");let c=i,d=!1;if(3===i.rank&&(d=!0,c=li(i,[1,i.shape[0],i.shape[1],i.shape[2]])),"NCHW"===o)throw new Error("separableConv2d currently does not support dataFormat NCHW; only NHWC is supported");p(4===c.rank,()=>`Error in separableConv2d: input must be rank 4, but got rank ${c.rank}.`),p(4===u.rank,()=>`Error in separableConv2d: depthwise filter must be rank 4, but got rank ${u.rank}.`),p(4===l.rank,()=>`Error in separableConv2d: pointwise filter must be rank 4, but got rank ${u.rank}.`),p(1===l.shape[0],()=>`Error in separableConv2d: the first dimension of pointwise filter  must be 1, but got ${l.shape[0]}.`),p(1===l.shape[1],()=>`Error in separableConv2d: the second dimension of pointwise filter must be 1, but got ${l.shape[1]}.`);const h=u.shape[2],m=u.shape[3];p(l.shape[2]===h*m,()=>`Error in separableConv2d: the third dimension of pointwise filter must be ${h*m}, but got ${l.shape[2]}.`);const f=Ki(c,u,r,a,o,s),g=Ri(f,l,1,"valid",o);return d?li(g,[g.shape[1],g.shape[2],g.shape[3]]):g}});
/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Bc=async function(e,t){const n=ts(e,"x","setdiff1d"),r=ts(t,"y","setdiff1d");p(n.dtype===r.dtype,()=>`x and y should have the same dtype, but got x (${n.dtype}) and y (${r.dtype}).`),p(1===n.rank,()=>`x should be 1D tensor, but got x (${n.shape}).`),p(1===r.rank,()=>`y should be 1D tensor, but got y (${r.shape}).`);const a=await n.data(),s=await r.data(),o=new Set(s);let i=0;for(let c=0;c<a.length;c++)o.has(a[c])||i++;const u=new ma([i],n.dtype),l=new ma([i],"int32");for(let c=0,p=0;c<a.length;c++)o.has(a[c])||(u.values[p]=a[c],l.values[p]=c,p++);return[u.toTensor(),l.toTensor()]};
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const zc=as({sign_:function(e){const t={x:ts(e,"x","sign")};return Ga.runKernel(Bn,t)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Lc=as({sin_:function(e){const t={x:ts(e,"x","sin","float32")};return Ga.runKernel(Cn,t)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Pc=as({sinh_:function(e){const t={x:ts(e,"x","sinh")};return Ga.runKernel(Fn,t)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Vc=as({slice1d_:function(e,t,n){const r=ts(e,"x","slice1d");return p(1===r.rank,()=>`slice1d expects a rank-1 tensor, but got a rank-${r.rank} tensor`),fi(r,[t],[n])}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Uc=as({slice2d_:function(e,t,n){const r=ts(e,"x","slice2d");return p(2===r.rank,()=>`slice2d expects a rank-2 tensor, but got a rank-${r.rank} tensor`),fi(r,t,n)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const jc=as({slice3d_:function(e,t,n){const r=ts(e,"x","slice3d");return p(3===r.rank,()=>`slice3d expects a rank-3 tensor, but got a rank-${r.rank} tensor`),fi(r,t,n)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Wc=as({slice4d_:function(e,t,n){const r=ts(e,"x","slice4d");return p(4===r.rank,()=>`slice4d expects a rank-4 tensor, but got a rank-${r.rank} tensor`),fi(r,t,n)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Gc=as({softmax_:function(e,t=-1){const n=ts(e,"logits","softmax","float32");if(-1===t&&(t=n.rank-1),t!==n.rank-1)throw Error(`Softmax along a non-last dimension is not yet supported. Logits was rank ${n.rank} and dim was ${t}`);const r={logits:n},a={dim:t};return Ga.runKernel(Wn,r,a)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const qc=as({fft_:function(e){p("complex64"===e.dtype,()=>`The dtype for tf.spectral.fft() must be complex64 but got ${e.dtype}.`);const t={input:e};return Ga.runKernel(ut,t)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Kc=as({ifft_:function(e){p("complex64"===e.dtype,()=>`The dtype for tf.spectral.ifft() must be complex64 but got ${e.dtype}.`);const t={input:e};return Ga.runKernel(wt,t)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Hc=as({irfft_:function(e){const t=e.shape[e.shape.length-1],n=e.size/t;let r;if(t<=2){const a=li(e,[n,t]);r=Kc(a)}else{const a=[n,2*(t-1)],s=li(Tc(e),[n,t]),o=li(Fu(e),[n,t]),i=Ic(fi(s,[0,1],[n,t-2]),1),u=Ro(Ic(fi(o,[0,1],[n,t-2]),1),xu(-1)),l=di([s,i],1),c=di([o,u],1),p=li(ss(l,c),[a[0],a[1]]);r=Kc(p)}if(r=Tc(r),3===e.rank&&0!==e.shape[0]){const t=r,n=e.shape[0];r=li(r,[n,r.shape[0]/n,r.shape[1]]),t.dispose()}return r}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Zc=as({split_:function(e,t,n=0){const r={x:ts(e,"x","split")},a={numOrSizeSplits:t,axis:n};return Ga.runKernel(jn,r,a)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Jc=as({rfft_:function(e,t){p("float32"===e.dtype,()=>`The dtype for rfft() must be real value but got ${e.dtype}`);let n=e.shape[e.shape.length-1];const r=e.size/n;let a;if(null!=t&&t<n){const r=e.shape.map(e=>0),s=e.shape.map(e=>e);s[e.shape.length-1]=t,a=fi(e,r,s),n=t}else if(null!=t&&t>n){const r=e.shape.map(e=>e);r[e.shape.length-1]=t-n,a=di([e,bl(r)],e.shape.length-1),n=t}else a=e;const s=nu(a),o=li(ss(a,s),[r,n]),i=qc(o),u=Math.floor(n/2)+1,l=Tc(i),c=Fu(i),d=Zc(l,[u,n-u],l.shape.length-1),h=Zc(c,[u,n-u],c.shape.length-1),m=a.shape.slice();return m[a.shape.length-1]=u,li(ss(d[0],h[0]),m)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Xc=as({squaredDifference_:function(e,t){let n=ts(e,"a","squaredDifference"),r=ts(t,"b","squaredDifference");[n,r]=Ca(n,r),Yi(n.shape,r.shape);const a={a:n,b:r};return Ga.runKernel(Jn,a,{})}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Yc=as({squeeze_:function(e,t){const n=ts(e,"x","squeeze","string_or_numeric");return li(n,v(n.shape,t).newShape)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Qc=as({stack_:function(e,t=0){const n=ns(e,"tensors","stack","string_or_numeric");p(n.length>=1,()=>"Pass at least one tensor to tf.stack"),n.length>0&&p(t<=n[0].rank,()=>"Axis must be <= rank of the tensor");const r=n,a={axis:t};return Ga.runKernel(on,r,a)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const ep=as({step_:function(e,t=0){const n={x:ts(e,"x","step")},r={alpha:t};return Ga.runKernel(fr,n,r)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const tp=as({stridedSlice_:function(e,t,n,r,a=0,s=0,o=0,i=0,u=0){const l={x:ts(e,"x","stridedSlice","string_or_numeric")},c={begin:t,end:n,strides:r,beginMask:a,endMask:s,ellipsisMask:o,newAxisMask:i,shrinkAxisMask:u};return Ga.runKernel(Qn,l,c)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const np=as({tan_:function(e){const t={x:ts(e,"x","tan","float32")};return Ga.runKernel(ar,t)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function rp(e,t){h(e);const n=Ya(e,t);if(1!==n.length)throw new Error("tensor1d() requires values to be a flat/TypedArray");return os(e,null,n,t)}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ap(e,t,n){if(h(e),null!=t&&2!==t.length)throw new Error("tensor2d() requires shape to have two numbers");const r=Ya(e,n);if(2!==r.length&&1!==r.length)throw new Error("tensor2d() requires values to be number[][] or flat/TypedArray");if(1===r.length&&null==t)throw new Error("tensor2d() requires shape to be provided when `values` are a flat/TypedArray");return os(e,t,r,n)}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function sp(e,t,n){if(h(e),null!=t&&3!==t.length)throw new Error("tensor3d() requires shape to have three numbers");const r=Ya(e,n);if(3!==r.length&&1!==r.length)throw new Error("tensor3d() requires values to be number[][][] or flat/TypedArray");if(1===r.length&&null==t)throw new Error("tensor3d() requires shape to be provided when `values` are a flat array");return os(e,t,r,n)}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function op(e,t,n){if(h(e),null!=t&&4!==t.length)throw new Error("tensor4d() requires shape to have four numbers");const r=Ya(e,n);if(4!==r.length&&1!==r.length)throw new Error("tensor4d() requires values to be number[][][][] or flat/TypedArray");if(1===r.length&&null==t)throw new Error("tensor4d() requires shape to be provided when `values` are a flat array");return os(e,t,r,n)}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ip(e,t,n){if(h(e),null!=t&&5!==t.length)throw new Error("tensor5d() requires shape to have five numbers");const r=Ya(e,n);if(5!==r.length&&1!==r.length)throw new Error("tensor5d() requires values to be number[][][][][] or flat/TypedArray");if(1===r.length&&null==t)throw new Error("tensor5d() requires shape to be provided when `values` are a flat array");return os(e,t,r,n)}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function up(e,t,n){if(h(e),null!=t&&6!==t.length)throw new Error("tensor6d() requires shape to have six numbers");const r=Ya(e,n);if(6!==r.length&&1!==r.length)throw new Error("tensor6d() requires values to be number[][][][][][] or flat/TypedArray");if(1===r.length&&null==t)throw new Error("tensor6d() requires shape to be provided when `values` are a flat array");return os(e,t=t||r,r,n)}function lp(e,t,n){const r=t.rank>1?t.shape[t.rank-1]:1,a=t.rank>1?t.rank-1:1,s=`Must have updates.shape = indices.shape[:batchDim] + shape[sliceDim:], got updates.shape: ${n.shape}, indices.shape: ${t.shape}, shape: ${e}, sliceDim: ${r}, and batchDim: ${a}.`;if(n.rank<a)throw new Error(s+` update.rank < ${a}. `);if(e.length<r+(n.rank-a))throw new Error(s+` Output shape length < ${r+(n.rank-a)}`);if(n.rank!==a+e.length-r)throw new Error(s+" update.rank != "+(a+e.length-r));for(let o=0;o<a;++o)if(n.shape[o]!==t.shape[o])throw new Error(s+` updates.shape[${o}] (${n.shape[o]}) != indices.shape[${o}] (${t.shape[o]}).`);for(let o=0;o<n.rank-a;++o)if(n.shape[o+a]!==e[o+r])throw new Error(s+` updates.shape[${o+a}] (${n.shape[o+a]}) != shape[${o+a}] (${e[o+a]})`)}function cp(e,t,n){if(t.rank<1)throw new Error(`tf.scatterND() expects the indices to be rank 1 or higher, but the rank was ${t.rank}.`);if(e.rank<1)throw new Error(`tf.scatterND() expects the updates to be rank 1 or higher, but the rank was ${e.rank}.`);if("int32"!==t.dtype)throw new Error(`The dtype of 'indices' should be int32, but got dtype: ${t.dtype}`);if(n.length<1)throw new Error(`Output rank must be greater or equal to 1, but got shape: ${n}`);if(0===n.length){if(0===t.size)throw new Error(`Indices specified for empty output. indices shape: ${t.shape}`);if(0===e.size)throw new Error(`Updates specified for empty output. updates shape: ${e.shape}`)}lp(n,t,e)}function pp(e,t,n){const r=t.shape.length,a=r>1?t.shape[r-1]:1,s=n.length;let o=1;for(let u=a;u<s;++u)o*=n[u];const i=a<1?1:a;return{sliceRank:a,numUpdates:m(t.shape)/i,sliceSize:o,strides:[...B(n.slice(0,a)),1],outputSize:m(n)}}const dp=Object.freeze(Object.defineProperty({__proto__:null,calculateShapes:pp,validateInput:cp,validateUpdateShape:lp},Symbol.toStringTag,{value:"Module"}));
/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const hp=as({tensorScatterUpdate_:function(e,t,n){const r=ts(e,"tensor","tensorScatterupdate"),a=ts(t,"indices","tensorScatterupdate","int32"),s=ts(n,"updates","tensorScatterupdate");if(cp(s,a,r.shape),r.dtype!==s.dtype)throw new Error(`tensor and updates must have the same dtype, instead they are ${r.dtype} and ${s.dtype}.`);const o={tensor:r,indices:a,updates:s};return Ga.runKernel(Mn,o,{})}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const mp=as({topk_:function(e,t=1,n=!0){const r=ts(e,"x","topk");if(0===r.rank)throw new Error("topk() expects the input to be of rank 1 or higher");const a=r.shape[r.shape.length-1];if(t<0)throw new Error(`'k' passed to topk() must be >= 0 but got ${t}`);if(t>a)throw new Error(`'k' passed to topk() must be <= the last dimension (${a}) but got ${t}`);const s={x:r},o={k:t,sorted:n},[i,u]=Ga.runKernel(ir,s,o);return{values:i,indices:u}}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const fp=as({truncatedNormal_:function(e,t=0,n=1,r,a){if(W(e),null!=r&&"bool"===r)throw new Error("Unsupported data type $ { dtype }");const s=new fc(t,n,r,!0,a),o=_o(e,r);for(let i=0;i<o.values.length;i++)o.values[i]=s.nextValue();return o.toTensor()}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const gp=as({unique_:function(e,t=0){const n=ts(e,"x","unique","string_or_numeric");p(n.rank>0,()=>"The input tensor must be at least 1D");const r={x:n},a={axis:t},[s,o]=Ga.runKernel(cr,r,a);return{values:s,indices:o}}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const yp=as({unsortedSegmentSum_:function(e,t,n){const r=ts(e,"x","unsortedSegmentSum"),a=ts(t,"segmentIds","unsortedSegmentSum","int32");p(y(n),()=>"numSegments must be of dtype int");const s={x:r,segmentIds:a},o={numSegments:n};return Ga.runKernel(dr,s,o)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const bp=as({unstack_:function(e,t=0){const n=ts(e,"x","unstack","string_or_numeric");p(t>=-n.shape.length&&t<n.shape.length,()=>`Axis = ${t} is not in [-${n.shape.length}, ${n.shape.length})`);const r={value:n},a={axis:t};return Ga.runKernel(pr,r,a)}});
/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function wp(e,t){return pl(e,t,"right")}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function xp(e,t=!0,n,r){return Ga.makeVariable(e,t,n,r)}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Np(e,t){const n=[];for(let s=0;s<t.length;s++)t[s]&&n.push(s);const r=_o(e,"int32"),a=_o([n.length,e.length],"int32");for(let s=0;s<n.length;s++){const t=r.indexToLoc(n[s]),o=s*e.length;a.values.set(t,o)}return a.toTensor()}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Sp=async function(e){const t=ts(e,"condition","whereAsync","bool"),n=await t.data(),r=Np(t.shape,n);return e!==t&&t.dispose(),r};
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const vp=async function(e,t,n){const r=ts(e,"tensor","boolMask"),a=ts(t,"mask","boolMask","bool"),s=null==n?0:n,o=a.rank,i=r.shape;p(o>0,()=>"mask cannot be scalar"),d(i.slice(s,s+o),a.shape,"mask's shape must match the first K dimensions of tensor's shape,");let u=1;for(let p=s;p<s+o;p++)u*=i[p];const l=i.slice(0,s).concat([u],i.slice(s+o)),c=li(r,l),h=li(a,[-1]),m=await Sp(h),f=Yc(m,[1]),g=Du(c,f,s);return e!==r&&r.dispose(),t!==a&&a.dispose(),f.dispose(),c.dispose(),h.dispose(),m.dispose(),g};
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Tp=as({transpose_:function(e,t,n){const r=ts(e,"x","transpose");if(null==t&&(t=r.shape.map((e,t)=>t).reverse()),p(r.rank===t.length,()=>`Error in transpose: rank of input ${r.rank} must match length of perm ${t}.`),t.forEach(e=>{p(e>=0&&e<r.rank,()=>`All entries in 'perm' must be between 0 and ${r.rank-1} but got ${t}`)}),r.rank<=1)return r.clone();const a={x:r},s={perm:t};return"complex64"===r.dtype?bs(()=>{let e=Tc(r),t=Fu(r);return e=Ga.runKernel(lr,{x:e},s),t=Ga.runKernel(lr,{x:t},s),n&&(t=el(t)),ss(e,t)}):Ga.runKernel(lr,a,s)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const kp=as({movingAverage_:function(e,t,n,r,a=!0){const s=ts(e,"v","movingAverage"),o=ts(t,"x","movingAverage"),i=ts(n,"decay","movingAverage");Fa(s,o),p(g(s.shape,o.shape),()=>"Shape mismatch in v and x");const u=xu(1),l=rl(u,i);let c=Ro(rl(o,s),l);if(a){p(null!=r,()=>"When using zeroDebias: true, step is required.");const e=ts(r,"step","movingAverage");c=Do(c,rl(u,wu(i,e)))}return $o(s,c)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Ep=as({scatterND_:function(e,t,n){W(n);const r=ts(e,"indices","scatterND","int32"),a=ts(t,"updates","scatterND");cp(a,r,n);const s={indices:r,updates:a},o={shape:n};return Ga.runKernel(An,s,o)}});const _p=as({sparseToDense_:
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e,t,n,r=0){W(n);const a=ts(e,"sparseIndices","sparseToDense","int32"),s=ts(t,"sparseValues","sparseToDense","string_or_numeric"),o=ts(r,"defaultValue","sparseToDense",s.dtype);!function(e,t,n,r){if("int32"!==e.dtype)throw new Error(`tf.sparseToDense() expects the indices to be int32 type, but the dtype was ${e.dtype}.`);if(e.rank>2)throw new Error(`sparseIndices should be a scalar, vector, or matrix, but got shape ${e.shape}.`);const a=e.rank>0?e.shape[0]:1,s=e.rank>1?e.shape[1]:1;if(n.length!==s)throw new Error(`outputShape has incorrect number of elements:, ${n.length}, should be: ${s}.`);const o=t.size;if(0!==t.rank&&(1!==t.rank||o!==a))throw new Error(`sparseValues has incorrect shape ${t.shape}, should be [] or [${a}]`);if(t.dtype!==r.dtype)throw new Error("sparseValues.dtype must match defaultValues.dtype")}(a,s,n,o);const i={sparseIndices:a,sparseValues:s,defaultValue:o},u={outputShape:n};return Ga.runKernel(Zn,i,u)}});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Ip=as({gatherND_:function(e,t){const n=ts(t,"indices","gatherND","int32"),r={params:ts(e,"x","gatherND","string_or_numeric"),indices:n};return Ga.runKernel(ft,r)}});
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Ap=as({dropout_:
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e,t,n,r){const a=ts(e,"x","dropout");if(p("float32"===a.dtype,()=>`x has to be a floating point tensor since it's going to be scaled, but got a ${a.dtype} tensor instead.`),p(t>=0&&t<1,()=>`rate must be a float in the range [0, 1), but got ${t}.`),0===t)return e instanceof ya?a.clone():a;const s=function(e,t){if(null==t)return e.shape.slice();if(g(e.shape,t))return t;if(e.shape.length===t.length){const n=[];for(let r=0;r<e.shape.length;r++)null==t[r]&&null!=e.shape[r]?n.push(e.shape[r]):n.push(t[r]);return n}return t}(a,n),o=1-t,i=Do(Ou($o(Nc(s,0,1,"float32",r),o)),o);return Ro(a,i)}});
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Mp(e){return Math.floor(Math.pow(2,Math.ceil(Math.log(e)/Math.log(2))))}function $p(e,t,n){const r=1-e%2,a=new Float32Array(e);for(let s=0;s<e;++s){const o=2*Math.PI*s/(e+r-1);a[s]=t-n*Math.cos(o)}return rp(a,"float32")}
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Op=async function(e,t,n=1){const r=ts(e,"predictions","inTopK"),a=ts(t,"targets","inTopK");p(r.rank>1,()=>`inTopK() expects the predictions to be of rank 2 or higher, but got ${r.rank}`),p(r.rank-1===a.rank,()=>`predictions rank should be 1 larger than targets rank, but got predictions rank ${r.rank} and targets rank ${a.rank}`),d(r.shape.slice(0,r.shape.length-1),a.shape,"predictions's shape should be align with the targets' shape, except the last dimension.");const s=r.shape[r.shape.length-1];p(n>0&&n<=s,()=>`'k' passed to inTopK() must be > 0 && <= the predictions last dimension (${s}), but got ${n}`);const o=await r.data(),i=await a.data(),[u,l]=[o.length/s,s],c=T("bool",u);for(let p=0;p<u;p++){const e=p*l,t=o.subarray(e,e+l),r=[];for(let n=0;n<t.length;n++)r.push({value:t[n],index:n});r.sort((e,t)=>t.value-e.value),c[p]=0;for(let a=0;a<n;a++)if(r[a].index===i[p]){c[p]=1;break}}return e!==r&&r.dispose(),t!==a&&a.dispose(),is(c,a.shape,"bool")};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Dp=as({conv2DBackpropFilter_:function(e,t,n,r,a,s="NHWC",o){let i=e;3===e.rank&&(i=li(e,[1,e.shape[0],e.shape[1],e.shape[2]]));let u=t;3===u.rank&&(u=li(t,[1,t.shape[0],t.shape[1],t.shape[2]])),p(4===i.rank,()=>`Error in conv2dDerFilter: input must be rank 4, but got shape ${i.shape}.`),p(4===u.rank,()=>`Error in conv2dDerFilter: dy must be rank 4, but got shape ${u.shape}.`),p(4===n.length,()=>`Error in conv2dDerFilter: filterShape must be length 4, but got ${n}.`);const l="NHWC"===s?i.shape[3]:i.shape[1],c="NHWC"===s?u.shape[3]:u.shape[1];p(l===n[2],()=>`Error in conv2dDerFilter: depth of input ${l}) must match input depth in filter (${n[2]}.`),p(c===n[3],()=>`Error in conv2dDerFilter: depth of dy (${c}) must match output depth for filter (${n[3]}).`),ui("conv2dDerFilter",a,o);const d={x:i,dy:u},h={strides:r,pad:a,dataFormat:s,dimRoundingMode:o,filterShape:n};return Ga.runKernel(De,d,h)}});
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Rp(e,t,n){if(null==n||"linear"===n)return e;if("relu"===n)return Ro(e,ep(t));throw new Error(`Cannot compute gradient for fused activation ${n}.`)}function Cp(e,t){let n=t;const r=Xi(e.shape,t.shape);return r.length>0&&(n=vu(n,r)),li(n,e.shape)}function Fp(e,t,n,r){if("linear"===t)return e;if("relu"===t)return Ec(e);if("elu"===t)return ou(e);if("relu6"===t)return _c(e);if("prelu"===t)return zl(e,n);if("leakyrelu"===t)return Pu(e,r);if("sigmoid"===t)return mi(e);throw new Error(`Unknown fused activation ${t}.`)}const Bp=(e,t)=>!(e>0)||"linear"===t;
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const zp=as({fusedConv2d_:function({x:e,filter:t,strides:n,pad:r,dataFormat:a="NHWC",dilations:s=[1,1],dimRoundingMode:o,bias:i,activation:u="linear",preluActivationWeights:l,leakyreluAlpha:c}){if(u=u||"linear",!1===Bp(Ga.state.gradientDepth,u)){p("NHWC"===a,()=>`Error in fused conv2d: got dataFormat of ${a} but only NHWC is currently supported for the case of gradient depth is 0 and the activation is not linear.`);let d=Ri(e,t,n,r,a,s,o);return null!=i&&(d=$o(d,i)),Fp(d,u,l,c)}const d=ts(e,"x","conv2d","float32"),h=ts(t,"filter","conv2d","float32");let m=d,f=!1;3===d.rank&&(f=!0,m=li(d,[1,d.shape[0],d.shape[1],d.shape[2]])),p(4===m.rank,()=>`Error in fused conv2d: input must be rank 4, but got rank ${m.rank}.`),p(4===h.rank,()=>`Error in fused conv2d: filter must be rank 4, but got rank ${h.rank}.`),ui("fused conv2d",r,o);const g="NHWC"===a?m.shape[3]:m.shape[1];p(h.shape[2]===g,()=>`Error in conv2d: depth of input (${g}) must match input depth for filter ${h.shape[2]}.`),p(si(n,s),()=>`Error in conv2D: Either strides or dilations must be 1. Got strides ${n} and dilations '${s}'`);const y=Xo(m.shape,h.shape,n,s,r,o);let b,w;if(null!=i&&(b=ts(i,"bias","fused conv2d"),[b]=Ca(b,d),"NHWC"===a?Yi(y.outShape,b.shape):(p(b.shape.length<=1,()=>`Error in fused conv2d: only supports scalar or 1-D Tensor bias for NCHW format but got the bias of rank-${b.shape.length}.`),p(0===b.shape.length||b.shape[0]===y.outChannels||1===b.shape[0],()=>`Error in fused conv2d: bias shape (${b.shape}) is not compatible with the number of output channels (${y.outChannels})`))),null!=l){const e=l.shape;if(p(e.length<=1||3===e.length,()=>`Error in fused conv2d: only supports scalar, 1-D Tensor or 3-D Tensor PReLU activation weights but got a tensor of rank-${e.length}.`),1===e.length)p(1===e[0]||e[0]===y.outChannels,()=>`Error in fused conv2d: PReLU activation weights (${e}) is not compatible with the number of output channels (${y.outChannels}).`);else if(3===e.length)try{Yi(e,y.outShape)}catch(v){const t=`Error in fused conv2d: PReLU activation weights (${e}) is not compatible with the output shape of the conv2d (${y.outShape}).`;throw Error(t)}w=ts(l,"prelu weights","fused conv2d")}const x=(e,t)=>{p("NHWC"===a,()=>`Error in gradient of fused conv2D: got dataFormat of ${a} but only NHWC is currently supported.`);const[o,i,l,c]=t,d=Rp(e,l,u);p(ai(s),()=>`Error in gradient of fused conv2D: dilation rates greater than 1 are not yet supported in gradients. Got dilations '${s}'`);const h=[Fi(i.shape,d,o,n,r),Dp(i,d,o.shape,n,r)];if(null!=c){const e=Cp(c,d);h.push(e)}return h},N={x:m,filter:h,bias:b,preluActivationWeights:w},S={strides:n,pad:r,dataFormat:a,dilations:s,dimRoundingMode:o,activation:u,leakyreluAlpha:c};if(null==i){return Yu((e,t,n)=>{let r=Ga.runKernel(wr,N,S);return n([t,e,r]),f&&(r=li(r,[r.shape[1],r.shape[2],r.shape[3]])),{value:r,gradFunc:x}})(m,h)}return Yu((e,t,n,r)=>{let a=Ga.runKernel(wr,N,S);return r([t,e,a,n]),f&&(a=li(a,[a.shape[1],a.shape[2],a.shape[3]])),{value:a,gradFunc:x}})(m,h,b)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Lp=as({depthwiseConv2dNativeBackpropFilter_:function(e,t,n,r,a,s=[1,1],o){let i=e;3===e.rank&&(i=li(e,[1,e.shape[0],e.shape[1],e.shape[2]]));let u=t;3===u.rank&&(u=li(t,[1,t.shape[0],t.shape[1],t.shape[2]]));const l={x:i,dy:u},c={strides:r,pad:a,dimRoundingMode:o,dilations:s,filterShape:n};return Ga.runKernel(qe,l,c)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Pp=as({depthwiseConv2dNativeBackpropInput_:function(e,t,n,r,a,s=[1,1],o){let i=t,u=!1;3===t.rank&&(u=!0,i=li(t,[1,t.shape[0],t.shape[1],t.shape[2]]));const l={dy:i,filter:n},c={strides:r,pad:a,dimRoundingMode:o,dilations:s,inputShape:e},p=Ga.runKernel(Ke,l,c);return u?li(p,[p.shape[1],p.shape[2],p.shape[3]]):p}});
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Vp=as({fusedDepthwiseConv2d_:function({x:e,filter:t,strides:n,pad:r,dataFormat:a="NHWC",dilations:s=[1,1],dimRoundingMode:o,bias:i,activation:u="linear",preluActivationWeights:l,leakyreluAlpha:c}){if(!1===Bp(Ga.state.gradientDepth,u)){let p=Ki(e,t,n,r,a,s,o);return null!=i&&(p=$o(p,i)),Fp(p,u,l,c)}const d=ts(e,"x","depthwiseConv2d","float32"),h=ts(t,"filter","depthwiseConv2d","float32");let m=d,f=!1;3===d.rank&&(f=!0,m=li(d,[1,d.shape[0],d.shape[1],d.shape[2]])),p(4===m.rank,()=>`Error in fused depthwiseConv2d: input must be rank 4, but got rank ${m.rank}.`),p(4===h.rank,()=>`Error in fused depthwiseConv2d: filter must be rank 4, but got rank ${h.rank}.`),p(m.shape[3]===h.shape[2],()=>`Error in fused depthwiseConv2d: number of input channels (${m.shape[3]}) must match the inChannels dimension in filter ${h.shape[2]}.`),null==s&&(s=[1,1]),p(si(n,s),()=>`Error in fused depthwiseConv2d: Either strides or dilations must be 1. Got strides ${n} and dilations '${s}'`),ui("fused depthwiseConv2d",r,o);const g=Xo(m.shape,h.shape,n,s,r,o,!0);let y,b;null!=i&&(y=ts(i,"bias","fused conv2d"),[y]=Ca(y,d),Yi(g.outShape,y.shape)),null!=l&&(b=ts(l,"prelu weights","fused depthwiseConv2d"));const w=(e,t)=>{p(ai(s),()=>`Error in gradient of fused depthwiseConv2d: dilation rates greater than 1 are not yet supported. Got dilations '${s}'`);const[a,i,l,c]=t,d=Rp(e,l,u),h=Pp(i.shape,d,a,n,r,s,o),m=Lp(i,d,a.shape,n,r,s,o);if(null!=c){return[h,m,Cp(y,d)]}return[h,m]},x={x:m,filter:h,bias:y,preluActivationWeights:b},N={strides:n,pad:r,dataFormat:a,dilations:s,dimRoundingMode:o,activation:u,leakyreluAlpha:c};if(null==i){return Yu((e,t,n)=>{let r=Ga.runKernel(xr,x,N);return n([t,e,r]),f&&(r=li(r,[r.shape[1],r.shape[2],r.shape[3]])),{value:r,gradFunc:w}})(m,h)}return Yu((e,t,n,r)=>{let a=Ga.runKernel(xr,x,N);return r([t,e,a,n]),f&&(a=li(a,[a.shape[1],a.shape[2],a.shape[3]])),{value:a,gradFunc:w}})(m,h,y)}});
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Up=as({fusedMatMul_:function({a:e,b:t,transposeA:n=!1,transposeB:r=!1,bias:a,activation:s="linear",preluActivationWeights:o,leakyreluAlpha:i=.2}){if(!1===Bp(Ga.state.gradientDepth,s)){let u=hi(e,t,n,r);return null!=a&&(u=$o(u,a)),Fp(u,s,o,i)}let u=ts(e,"a","fused matMul"),l=ts(t,"b","fused matMul");[u,l]=Ca(u,l);const c=n?u.shape[u.rank-2]:u.shape[u.rank-1],d=r?l.shape[l.rank-1]:l.shape[l.rank-2],h=n?u.shape[u.rank-1]:u.shape[u.rank-2],f=r?l.shape[l.rank-2]:l.shape[l.rank-1],g=u.shape.slice(0,-2),y=l.shape.slice(0,-2),b=m(g),w=m(y);p(c===d,()=>`Error in fused matMul: inner shapes (${c}) and (${d}) of Tensors with shapes ${u.shape} and ${l.shape} and transposeA=${n} and transposeB=${r} must match.`);const x=Yi(u.shape.slice(0,-2),l.shape.slice(0,-2)).concat([h,f]),N=li(u,n?[b,c,h]:[b,h,c]),S=li(l,r?[w,f,d]:[w,d,f]);let v,T;null!=a&&(v=ts(a,"bias","fused matMul"),[v]=Ca(v,u),Yi(x,v.shape)),null!=o&&(T=ts(o,"prelu weights","fused matMul"));const k=(e,t)=>{const[o,i,u,l]=t,c=Rp(li(e,u.shape),u,s);let p,d;if(n||r?!n&&r?(p=hi(c,i,!1,!1),d=hi(c,o,!0,!1)):n&&!r?(p=hi(i,c,!1,!0),d=hi(o,c,!1,!1)):(p=hi(i,c,!0,!0),d=hi(c,o,!0,!0)):(p=hi(c,i,!1,!0),d=hi(o,c,!0,!1)),null!=a){return[p,d,Cp(l,c)]}return[p,d]},E={a:N,b:S,bias:v,preluActivationWeights:T},_={transposeA:n,transposeB:r,activation:s,leakyreluAlpha:i};if(null==a){return Yu((e,t,n)=>{const r=Ga.runKernel(br,E,_);return n([e,t,r]),{value:li(r,x),gradFunc:k}})(N,S)}return Yu((e,t,n,r)=>{const a=Ga.runKernel(br,E,_);return r([e,t,a,n]),{value:li(a,x),gradFunc:k}})(N,S,v)}}),jp=Object.freeze(Object.defineProperty({__proto__:null,conv2d:zp,depthwiseConv2d:Vp,matMul:Up},Symbol.toStringTag,{value:"Module"}));
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Wp=as({hammingWindow_:
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e){return $p(e,.54,.46)}});
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Gp=as({hannWindow_:function(e){return $p(e,.5,.5)}});
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const qp=as({frame_:function(e,t,n,r=!1,a=0){let s=0;const o=[];for(;s+t<=e.size;)o.push(fi(e,s,t)),s+=n;if(r)for(;s<e.size;){const r=s+t-e.size,i=di([fi(e,s,t-r),Ii([r],a)]);o.push(i),s+=n}return 0===o.length?ap([],[0,t]):li(di(o),[o.length,t])}});
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Kp=as({stft_:function(e,t,n,r,a=Gp){null==r&&(r=Mp(t));const s=qp(e,t,n),o=Ro(s,a(t));return Jc(o,r)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Hp=as({cropAndResize_:function(e,t,n,r,a="bilinear",s=0){const o=ts(e,"image","cropAndResize"),i=ts(t,"boxes","cropAndResize","float32"),u=ts(n,"boxInd","cropAndResize","int32"),l=i.shape[0];p(4===o.rank,()=>`Error in cropAndResize: image must be rank 4,but got rank ${o.rank}.`),p(2===i.rank&&4===i.shape[1],()=>`Error in cropAndResize: boxes must be have size [${l},4] but had shape ${i.shape}.`),p(1===u.rank&&u.shape[0]===l,()=>`Error in cropAndResize: boxInd must be have size [${l}] but had shape ${i.shape}.`),p(2===r.length,()=>`Error in cropAndResize: cropSize must be of length 2, but got length ${r.length}.`),p(r[0]>=1&&r[1]>=1,()=>`cropSize must be atleast [1,1], but was ${r}`),p("bilinear"===a||"nearest"===a,()=>`method must be bilinear or nearest, but was ${a}`);const c={image:o,boxes:i,boxInd:u},d={method:a,extrapolationValue:s,cropSize:r};return Ga.runKernel(Ue,c,d)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Zp=as({flipLeftRight_:function(e){const t=ts(e,"image","flipLeftRight","float32");p(4===t.rank,()=>`Error in flipLeftRight: image must be rank 4,but got rank ${t.rank}.`);const n={image:t};return Ga.runKernel(ct,n,{})}});
/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Jp=as({grayscaleToRGB_:function(e){const t=ts(e,"image","grayscaleToRGB"),n=t.rank-1,r=t.shape[n];p(t.rank>=2,()=>`Error in grayscaleToRGB: images must be at least rank 2, but got rank ${t.rank}.`),p(1===r,()=>`Error in grayscaleToRGB: last dimension of a grayscale image should be size 1, but got size ${r}.`);const a=new Array(t.rank);return a.fill(1,0,n),a[n]=3,Mu(t,a)}});
/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Xp=as({rgbToGrayscale_:function(e){const t=ts(e,"image","RGBToGrayscale"),n=t.rank-1,r=t.shape[n];p(t.rank>=2,()=>`Error in RGBToGrayscale: images must be at least rank 2, but got rank ${t.rank}.`),p(3===r,()=>`Error in RGBToGrayscale: last dimension of an RGB image should be size 3, but got size ${r}.`);const a=t.dtype,s=Io(t,"float32"),o=rp([.2989,.587,.114]);let i;switch(t.rank){case 2:i=su("ij,j->i",s,o);break;case 3:i=su("ijk,k->ij",s,o);break;case 4:i=su("ijkl,l->ijk",s,o);break;case 5:i=su("ijklm,m->ijkl",s,o);break;case 6:i=su("ijklmn,n->ijklm",s,o);break;default:throw new Error("Not a valid tensor rank.")}return i=Iu(i,-1),Io(i,a)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Yp=as({rotateWithOffset_:function(e,t,n=0,r=.5){const a=ts(e,"image","rotateWithOffset","float32");p(4===a.rank,()=>`Error in rotateWithOffset: image must be rank 4,but got rank ${a.rank}.`);const s={image:a},o={radians:t,fillValue:n,center:r};return Ga.runKernel(yr,s,o)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Qp(e,t,n,r,a,s){null==r&&(r=.5),null==a&&(a=Number.NEGATIVE_INFINITY),null==s&&(s=0);const o=e.shape[0];return n=Math.min(n,o),p(0<=r&&r<=1,()=>`iouThreshold must be in [0, 1], but was '${r}'`),p(2===e.rank,()=>`boxes must be a 2D tensor, but was of rank '${e.rank}'`),p(4===e.shape[1],()=>`boxes must have 4 columns, but 2nd dimension was ${e.shape[1]}`),p(1===t.rank,()=>"scores must be a 1D tensor"),p(t.shape[0]===o,()=>`scores has incompatible shape with boxes. Expected ${o}, but was ${t.shape[0]}`),p(0<=s&&s<=1,()=>`softNmsSigma must be in [0, 1], but was '${s}'`),{maxOutputSize:n,iouThreshold:r,scoreThreshold:a,softNmsSigma:s}}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const ed=as({nonMaxSuppression_:function(e,t,n,r=.5,a=Number.NEGATIVE_INFINITY){const s=ts(e,"boxes","nonMaxSuppression","float32"),o=ts(t,"scores","nonMaxSuppression","float32"),i=Qp(s,o,n,r,a),u={maxOutputSize:n=i.maxOutputSize,iouThreshold:r=i.iouThreshold,scoreThreshold:a=i.scoreThreshold};return Ga.runKernel(tn,{boxes:s,scores:o},u)}});
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function td(e,t,n){const r=function(e,t,n){return function(e,t,n){let r=0,a=e.length,s=0,o=!1;for(;r<a;){s=r+(a-r>>>1);const i=n(t,e[s]);i>0?r=s+1:(a=s,o=!i)}return o?r:-r-1}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */(e,t,n||nd)}(e,t,n),a=r<0?-(r+1):r;e.splice(a,0,t)}function nd(e,t){return e>t?1:e<t?-1:0}function rd(e,t,n,r,a){return od(e,t,n,r,a,0)}function ad(e,t,n,r,a,s){return od(e,t,n,r,a,0,!1,s,!0)}function sd(e,t,n,r,a,s){return od(e,t,n,r,a,s,!0)}function od(e,t,n,r,a,s,o=!1,i=!1,u=!1){const l=[];for(let g=0;g<t.length;g++)t[g]>a&&l.push({score:t[g],boxIndex:g,suppressBeginIndex:0});l.sort(ld);const c=s>0?-.5/s:0,p=[],d=[];for(;p.length<n&&l.length>0;){const t=l.pop(),{score:n,boxIndex:s,suppressBeginIndex:o}=t;if(n<a)break;let i=!1;for(let u=p.length-1;u>=o;--u){const n=id(e,s,p[u]);if(n>=r){i=!0;break}if(t.score=t.score*ud(r,c,n),t.score<=a)break}t.suppressBeginIndex=p.length,i||(t.score===n?(p.push(s),d.push(t.score)):t.score>a&&td(l,t,ld))}const h=p.length,m=n-h;i&&m>0&&(p.push(...new Array(m).fill(0)),d.push(...new Array(m).fill(0)));const f={selectedIndices:p};return o&&(f.selectedScores=d),u&&(f.validOutputs=h),f}function id(e,t,n){const r=e.subarray(4*t,4*t+4),a=e.subarray(4*n,4*n+4),s=Math.min(r[0],r[2]),o=Math.min(r[1],r[3]),i=Math.max(r[0],r[2]),u=Math.max(r[1],r[3]),l=Math.min(a[0],a[2]),c=Math.min(a[1],a[3]),p=Math.max(a[0],a[2]),d=Math.max(a[1],a[3]),h=(i-s)*(u-o),m=(p-l)*(d-c);if(h<=0||m<=0)return 0;const f=Math.max(s,l),g=Math.max(o,c),y=Math.min(i,p),b=Math.min(u,d),w=Math.max(y-f,0)*Math.max(b-g,0);return w/(h+m-w)}function ud(e,t,n){const r=Math.exp(t*n*n);return n<=e?r:0}function ld(e,t){return e.score-t.score||e.score===t.score&&t.boxIndex-e.boxIndex}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const cd=async function(e,t,n,r=.5,a=Number.NEGATIVE_INFINITY){const s=ts(e,"boxes","nonMaxSuppressionAsync"),o=ts(t,"scores","nonMaxSuppressionAsync"),i=Qp(s,o,n,r,a);n=i.maxOutputSize,r=i.iouThreshold,a=i.scoreThreshold;const u=await Promise.all([s.data(),o.data()]),l=u[0],c=u[1],{selectedIndices:p}=rd(l,c,n,r,a);return s!==e&&s.dispose(),o!==t&&o.dispose(),rp(p,"int32")};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const pd=as({nonMaxSuppressionWithScore_:function(e,t,n,r=.5,a=Number.NEGATIVE_INFINITY,s=0){const o=ts(e,"boxes","nonMaxSuppression"),i=ts(t,"scores","nonMaxSuppression"),u=Qp(o,i,n,r,a,s),l={boxes:o,scores:i},c={maxOutputSize:n=u.maxOutputSize,iouThreshold:r=u.iouThreshold,scoreThreshold:a=u.scoreThreshold,softNmsSigma:s=u.softNmsSigma},p=Ga.runKernel(rn,l,c);return{selectedIndices:p[0],selectedScores:p[1]}}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const dd=async function(e,t,n,r=.5,a=Number.NEGATIVE_INFINITY,s=0){const o=ts(e,"boxes","nonMaxSuppressionAsync"),i=ts(t,"scores","nonMaxSuppressionAsync"),u=Qp(o,i,n,r,a,s);n=u.maxOutputSize,r=u.iouThreshold,a=u.scoreThreshold,s=u.softNmsSigma;const l=await Promise.all([o.data(),i.data()]),c=l[0],p=l[1],{selectedIndices:d,selectedScores:h}=sd(c,p,n,r,a,s);return o!==e&&o.dispose(),i!==t&&i.dispose(),{selectedIndices:rp(d,"int32"),selectedScores:rp(h)}};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const hd=as({nonMaxSuppressionPadded_:function(e,t,n,r=.5,a=Number.NEGATIVE_INFINITY,s=!1){const o=ts(e,"boxes","nonMaxSuppression"),i=ts(t,"scores","nonMaxSuppression"),u=Qp(o,i,n,r,a,null),l={boxes:o,scores:i},c={maxOutputSize:u.maxOutputSize,iouThreshold:u.iouThreshold,scoreThreshold:u.scoreThreshold,padToMaxOutputSize:s},p=Ga.runKernel(nn,l,c);return{selectedIndices:p[0],validOutputs:p[1]}}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const md=async function(e,t,n,r=.5,a=Number.NEGATIVE_INFINITY,s=!1){const o=ts(e,"boxes","nonMaxSuppressionAsync"),i=ts(t,"scores","nonMaxSuppressionAsync"),u=Qp(o,i,n,r,a,null),l=u.maxOutputSize,c=u.iouThreshold,p=u.scoreThreshold,[d,h]=await Promise.all([o.data(),i.data()]),{selectedIndices:m,validOutputs:f}=ad(d,h,l,c,p,s);return o!==e&&o.dispose(),i!==t&&i.dispose(),{selectedIndices:rp(m,"int32"),validOutputs:xu(f,"int32")}};
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const fd=as({resizeBilinear_:function(e,t,n=!1,r=!1){const a=ts(e,"images","resizeBilinear");p(3===a.rank||4===a.rank,()=>`Error in resizeBilinear: x must be rank 3 or 4, but got rank ${a.rank}.`),p(2===t.length,()=>`Error in resizeBilinear: new shape must 2D, but got shape ${t}.`),p(!1===r||!1===n,()=>"Error in resizeBilinear: If halfPixelCenters is true, alignCorners must be false.");let s=a,o=!1;3===a.rank&&(o=!0,s=li(a,[1,a.shape[0],a.shape[1],a.shape[2]]));const i={images:s},u={alignCorners:n,halfPixelCenters:r,size:t},l=Ga.runKernel(vn,i,u);return o?li(l,[l.shape[1],l.shape[2],l.shape[3]]):l}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const gd=as({resizeNearestNeighbor_:function(e,t,n=!1,r=!1){const a=ts(e,"images","resizeNearestNeighbor");p(3===a.rank||4===a.rank,()=>`Error in resizeNearestNeighbor: x must be rank 3 or 4, but got rank ${a.rank}.`),p(2===t.length,()=>`Error in resizeNearestNeighbor: new shape must 2D, but got shape ${t}.`),p("float32"===a.dtype||"int32"===a.dtype,()=>"`images` must have `int32` or `float32` as dtype"),p(!1===r||!1===n,()=>"Error in resizeNearestNeighbor: If halfPixelCenters is true, alignCorners must be false.");let s=a,o=!1;3===a.rank&&(o=!0,s=li(a,[1,a.shape[0],a.shape[1],a.shape[2]]));const i={images:s},u={alignCorners:n,halfPixelCenters:r,size:t},l=Ga.runKernel(Nn,i,u);return o?li(l,[l.shape[1],l.shape[2],l.shape[3]]):l}});
/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const yd=as({threshold_:function(e,t="binary",n=!1,r=.5){const a=ts(e,"image","threshold"),s=a.shape[0]*a.shape[1];let o,i,u,l,c=Ro(rp([r]),255);if(p(3===a.rank,()=>`Error in threshold: image must be rank 3,but got rank ${a.rank}.`),p(3===a.shape[2]||1===a.shape[2],()=>`Error in threshold: image color channel must be equal to 3 or 1but got ${a.shape[2]}.`),p("int32"===a.dtype||"float32"===a.dtype,()=>`Error in dtype: image dtype must be int32 or float32,but got dtype ${a.dtype}.`),p("otsu"===t||"binary"===t,()=>`Method must be binary or otsu, but was ${t}`),3===a.shape[2]){[o,i,u]=Zc(a,[1,1,1],-1);const e=Ro(o,.2989),t=Ro(i,.587),n=Ro(u,.114);l=$o($o(e,t),n)}else l=e;if("otsu"===t){c=function(e,t){let n,r,a,s,o,i,u=rp([-1]),l=rp([0]),c=rp([0]);for(let p=0;p<e.size-1;p++){n=fi(e,0,p+1),r=fi(e,p+1),o=Do(vu(n),t),i=Do(vu(r),t);const d=vu(Ro(n,vc(0,n.size)));a=Do(d,vu(n));const h=Ii(r.shape,n.size),m=$o(vc(0,r.size),h),f=Ro(r,m);s=Do(vu(f),vu(r));const g=rl(a,s),y=rl(a,s),b=Ro(o,i);c=Ro(Ro(b,g),y);const w=Ru(c,l);l=tu(w,c,l),u=tu(w,rp([p]),u)}return u}(vi(Io(Dc(l),"int32"),is([]),256),s)}const d=n?Uu(l,c):Ru(l,c);return Io(Ro(d,255),"int32")}});
/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const bd=as({transform_:function(e,t,n="nearest",r="constant",a=0,s){const o=ts(e,"image","transform","float32"),i=ts(t,"transforms","transform","float32");p(4===o.rank,()=>`Error in transform: image must be rank 4,but got rank ${o.rank}.`),p(2===i.rank&&(i.shape[0]===o.shape[0]||1===i.shape[0])&&8===i.shape[1],()=>"Error in transform: Input transform should be batch x 8 or 1 x 8"),p(null==s||2===s.length,()=>`Error in transform: outputShape must be [height, width] or null, but got ${s}.`);const u={image:o,transforms:i},l={interpolation:n,fillMode:r,fillValue:a,outputShape:s};return Ga.runKernel(ur,u,l)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const wd=as({bandPart_:function(e,t,n){const r=ts(e,"a","bandPart");p(r.rank>=2,()=>`bandPart(): Rank must be at least 2, got ${r.rank}.`);const a=r.shape,[s,o]=r.shape.slice(-2);let i,u;"number"==typeof t?(p(t%1==0,()=>`bandPart(): numLower must be an integer, got ${t}.`),p(t<=s,()=>`bandPart(): numLower (${t}) must not be greater than the number of rows (${s}).`),i=ts(t<0?s:t,"numLower","bandPart")):(p("int32"===t.dtype,()=>"bandPart(): numLower's dtype must be an int32."),i=tu(Vu(t,0),s,Nl(t,s))),"number"==typeof n?(p(n%1==0,()=>`bandPart(): numUpper must be an integer, got ${n}.`),p(n<=o,()=>`bandPart(): numUpper (${n}) must not be greater than the number of columns (${o}).`),u=ts(n<0?o:n,"numUpper","bandPart")):(p("int32"===n.dtype,()=>"bandPart(): numUpper's dtype must be an int32."),u=tu(Vu(n,0),o,Nl(n,o)));const l=li(vc(0,s,1,"int32"),[-1,1]),c=vc(0,o,1,"int32"),d=rl(l,c),h=ol(Uu(d,i),Cu(d,el(u))),m=bl([s,o],r.dtype);return li(Qc(bp(li(r,[-1,s,o])).map(e=>tu(h,e,m))),a)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const xd=as({gramSchmidt_:function(e){let t;if(Array.isArray(e)){t=!1,p(null!=e&&e.length>0,()=>"Gram-Schmidt process: input must not be null, undefined, or empty");const n=e[0].shape[0];for(let t=1;t<e.length;++t)p(e[t].shape[0]===n,()=>`Gram-Schmidt: Non-unique lengths found in the input vectors: (${e[t].shape[0]} vs. ${n})`)}else t=!0,e=Zc(e,e.shape[0],0).map(e=>Yc(e,[0]));p(e.length<=e[0].shape[0],()=>`Gram-Schmidt: Number of vectors (${e.length}) exceeds number of dimensions (${e[0].shape[0]}).`);const n=[],r=e;for(let a=0;a<e.length;++a)n.push(Ga.tidy(()=>{let e=r[a];if(a>0)for(let t=0;t<a;++t){const r=Ro(vu(Ro(n[t],e)),n[t]);e=rl(e,r)}return Do(e,ku(e,"euclidean"))}));return t?Qc(n,0):n}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Nd(e,t=!1){return Ga.tidy(()=>{p(2===e.shape.length,()=>`qr2d() requires a 2D Tensor, but got a ${e.shape.length}D Tensor.`);const n=e.shape[0],r=e.shape[1];let a=$u(n),s=Ao(e);const o=ap([[1]],[1,1]);let i=Ao(o);const u=n>=r?r:n;for(let e=0;e<u;++e){const t=s,u=i,l=a;[i,s,a]=Ga.tidy(()=>{const t=fi(s,[e,e],[n-e,1]),u=ku(t),l=fi(s,[e,e],[1,1]),c=tu(Ru(l,0),ap([[-1]]),ap([[1]])),p=rl(l,Ro(c,u)),d=Do(t,p);i=1===d.shape[0]?Ao(o):di([o,fi(d,[1,0],[d.shape[0]-1,d.shape[1]])],0);const h=el(Do(hi(c,p),u)),m=fi(s,[e,0],[n-e,r]),f=Ro(h,i),g=Tp(i);if(0===e)s=rl(m,hi(f,hi(g,m)));else{const t=rl(m,hi(f,hi(g,m)));s=di([fi(s,[0,0],[e,r]),t],0)}const y=Tp(f),b=fi(a,[0,e],[n,a.shape[1]-e]);if(0===e)a=rl(b,hi(hi(b,i),y));else{const t=rl(b,hi(hi(b,i),y));a=di([fi(a,[0,0],[n,e]),t],1)}return[i,s,a]}),ws([t,u,l])}return!t&&n>r&&(a=fi(a,[0,0],[n,r]),s=fi(s,[0,0],[r,r])),[a,s]})}const Sd=as({qr_:function(e,t=!1){if(p(e.rank>=2,()=>`qr() requires input tensor to have a rank >= 2, but got rank ${e.rank}`),2===e.rank)return Nd(e,t);{const n=e.shape.slice(0,e.shape.length-2).reduce((e,t)=>e*t),r=bp(li(e,[n,e.shape[e.shape.length-2],e.shape[e.shape.length-1]]),0),a=[],s=[];r.forEach(e=>{const[n,r]=Nd(e,t);a.push(n),s.push(r)});return[li(Qc(a,0),e.shape),li(Qc(s,0),e.shape)]}}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */var vd,Td;(Td=vd||(vd={}))[Td.NONE=0]="NONE",Td[Td.MEAN=1]="MEAN",Td[Td.SUM=2]="SUM",Td[Td.SUM_BY_NONZERO_WEIGHTS=3]="SUM_BY_NONZERO_WEIGHTS";const kd=as({computeWeightedLoss_:function(e,t,n=vd.SUM_BY_NONZERO_WEIGHTS){const r=ts(e,"losses","computeWeightedLoss");let a=null;null!=t&&(a=ts(t,"weights","computeWeightedLoss"));const s=null==a?r:Ro(r,a);if(n===vd.NONE)return s;if(n===vd.SUM)return vu(s);if(n===vd.MEAN){if(null==a)return yl(s);{const e=r.size/a.size,t=Do(vu(s),vu(a));return e>1?Do(t,xu(e)):t}}if(n===vd.SUM_BY_NONZERO_WEIGHTS){if(null==a)return Do(vu(s),xu(r.size));{const e=Ro(a,wl(r.shape)),t=Io(vu(_l(e,xu(0))),"float32");return Do(vu(s),t)}}throw Error(`Unknown reduction: ${n}`)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Ed=as({absoluteDifference_:function(e,t,n,r=vd.SUM_BY_NONZERO_WEIGHTS){const a=ts(e,"labels","absoluteDifference"),s=ts(t,"predictions","absoluteDifference");let o=null;null!=n&&(o=ts(n,"weights","absoluteDifference")),d(a.shape,s.shape,"Error in absoluteDifference: ");const i=Co(rl(a,s));return kd(i,o,r)}});const _d=as({cosineDistance_:function(e,t,n,r,a=vd.SUM_BY_NONZERO_WEIGHTS){const s=ts(e,"labels","cosineDistance"),o=ts(t,"predictions","cosineDistance");let i=null;null!=r&&(i=ts(r,"weights","cosineDistance")),d(s.shape,o.shape,"Error in cosineDistance: ");const u=xu(1),l=rl(u,vu(Ro(s,o),n,!0));return kd(l,i,a)}});const Id=as({hingeLoss_:function(e,t,n,r=vd.SUM_BY_NONZERO_WEIGHTS){let a=ts(e,"labels","hingeLoss");const s=ts(t,"predictions","hingeLoss");let o=null;null!=n&&(o=ts(n,"weights","hingeLoss")),d(a.shape,s.shape,"Error in hingeLoss: ");const i=xu(1);a=rl(Ro(xu(2),a),i);const u=Ec(rl(i,Ro(a,s)));return kd(u,o,r)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Ad=as({huberLoss_:function(e,t,n,r=1,a=vd.SUM_BY_NONZERO_WEIGHTS){const s=ts(e,"labels","huberLoss"),o=ts(t,"predictions","huberLoss");let i=null;null!=n&&(i=ts(n,"weights","huberLoss")),d(s.shape,o.shape,"Error in huberLoss: ");const u=xu(r),l=Co(rl(o,s)),c=Nl(l,u),p=rl(l,c),h=$o(Ro(xu(.5),Su(c)),Ro(u,p));return kd(h,i,a)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Md=as({logLoss_:function(e,t,n,r=1e-7,a=vd.SUM_BY_NONZERO_WEIGHTS){const s=ts(e,"labels","logLoss"),o=ts(t,"predictions","logLoss");let i=null;null!=n&&(i=ts(n,"weights","logLoss")),d(s.shape,o.shape,"Error in logLoss: ");const u=xu(1),l=xu(r),c=el(Ro(s,Gu($o(o,l)))),p=Ro(rl(u,s),Gu($o(rl(u,o),l))),h=rl(c,p);return kd(h,i,a)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const $d=as({meanSquaredError_:function(e,t,n,r=vd.SUM_BY_NONZERO_WEIGHTS){const a=ts(e,"labels","meanSquaredError"),s=ts(t,"predictions","meanSquaredError");let o=null;null!=n&&(o=ts(n,"weights","meanSquaredError")),d(a.shape,s.shape,"Error in meanSquaredError: ");const i=Xc(a,s);return kd(i,o,r)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Od=as({sigmoidCrossEntropy_:function(e,t,n,r=0,a=vd.SUM_BY_NONZERO_WEIGHTS){let s=ts(e,"multiClassLabels","sigmoidCrossEntropy");const o=ts(t,"logits","sigmoidCrossEntropy");let i=null;if(null!=n&&(i=ts(n,"weights","sigmoidCrossEntropy")),d(s.shape,o.shape,"Error in sigmoidCrossEntropy: "),r>0){const e=xu(r),t=xu(1),n=xu(.5);s=$o(Ro(s,rl(t,e)),Ro(n,e))}const u=function(e,t){const n=ts(e,"labels","sigmoidCrossEntropyWithLogits"),r=ts(t,"logits","sigmoidCrossEntropyWithLogits");d(n.shape,r.shape,"Error in sigmoidCrossEntropyWithLogits: ");const a=Ec(r),s=Ro(r,n),o=qu(_u(el(Co(r))));return $o(rl(a,s),o)}(s,o);return kd(u,i,a)}});
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Dd=as({softmaxCrossEntropy_:function(e,t,n,r=0,a=vd.SUM_BY_NONZERO_WEIGHTS){let s=ts(e,"onehotLabels","softmaxCrossEntropy");const o=ts(t,"logits","softmaxCrossEntropy");let i=null;if(null!=n&&(i=ts(n,"weights","softmaxCrossEntropy")),d(s.shape,o.shape,"Error in softmaxCrossEntropy: "),r>0){const e=xu(r),t=xu(1),n=xu(s.shape[1]);s=$o(Ro(s,rl(t,e)),Do(e,n))}const u=function(e,t,n=-1){if(-1===n&&(n=t.rank-1),n!==t.rank-1)throw Error(`Softmax cross entropy along a non-last dimension is not yet supported. Labels / logits was rank ${t.rank} and dim was ${n}`);return Yu((e,t,r)=>{const a=sl(t,[n],!0),s=rl(Io(t,"float32"),a);r([e,s]);const o=el(Ro(s,e));return{value:vu(o,[n]),gradFunc:(e,t)=>{const[r,a]=t,s=du(e.shape,[n]);return[Ro(li(e,s),rl(Io(r,"float32"),_u(a))),Ro(li(e,s),rl(_u(a),Io(r,"float32")))]}}})(e,t)}(s,o);return kd(u,i,a)}});
/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Rd={fft:qc,ifft:Kc,rfft:Jc,irfft:Hc},Cd={hammingWindow:Wp,hannWindow:Gp,frame:qp,stft:Kp},Fd={flipLeftRight:Zp,grayscaleToRGB:Jp,resizeNearestNeighbor:gd,resizeBilinear:fd,rgbToGrayscale:Xp,rotateWithOffset:Yp,cropAndResize:Hp,nonMaxSuppression:ed,nonMaxSuppressionAsync:cd,nonMaxSuppressionWithScore:pd,nonMaxSuppressionWithScoreAsync:dd,nonMaxSuppressionPadded:hd,nonMaxSuppressionPaddedAsync:md,threshold:yd,transform:bd},Bd={bandPart:wd,gramSchmidt:xd,qr:Sd},zd={absoluteDifference:Ed,computeWeightedLoss:kd,cosineDistance:_d,hingeLoss:Id,huberLoss:Ad,logLoss:Md,meanSquaredError:$d,sigmoidCrossEntropy:Od,softmaxCrossEntropy:Dd},Ld={sparseFillEmptyRows:as({sparseFillEmptyRows_:function(e,t,n,r){const a=ts(e,"indices","sparseFillEmptyRows","int32"),s=ts(t,"values","sparseFillEmptyRows"),o=ts(n,"denseShape","sparseFillEmptyRows","int32"),i=ts(r,"defaultValue","sparseFillEmptyRows",s.dtype);if(2!==a.rank)throw new Error(`Indices should be Tensor2D but received shape\n        ${a.shape}`);if(1!==s.rank)throw new Error(`Values should be Tensor1D but received shape ${s.shape}`);if(1!==o.rank)throw new Error(`Dense shape should be Tensor1D but received shape ${o.shape}`);if(0!==i.rank)throw new Error(`Default value should be a scalar but received shape ${i.shape}`);const u={indices:a,values:s,denseShape:o,defaultValue:i},l=Ga.runKernel(Gn,u);return{outputIndices:l[0],outputValues:l[1],emptyRowIndicator:l[2],reverseIndexMap:l[3]}}}),sparseReshape:as({sparseReshape_:
/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e,t,n){const r=ts(e,"inputIndices","sparseReshape","int32"),a=ts(t,"inputShape","sparseReshape","int32"),s=ts(n,"newShape","sparseReshape","int32");if(2!==r.rank)throw new Error(`Input indices should be Tensor2D but received shape\n        ${r.shape}`);if(1!==a.rank)throw new Error(`Input shape should be Tensor1D but received shape ${a.shape}`);if(1!==s.rank)throw new Error(`New shape should be Tensor1D but received shape ${s.shape}`);const o={inputIndices:r,inputShape:a,newShape:s},i=Ga.runKernel(qn,o);return{outputIndices:i[0],outputShape:i[1]}}}),sparseSegmentMean:as({sparseSegmentMean_:
/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e,t,n){const r=ts(e,"data","sparseSegmentMean"),a=ts(t,"indices","sparseSegmentMean","int32"),s=ts(n,"segmentIds","sparseSegmentMean","int32");if(r.rank<1)throw new Error("Data should be at least 1 dimensional but received scalar");if(1!==a.rank)throw new Error(`Indices should be Tensor1D but received shape\n          ${a.shape}`);if(1!==s.rank)throw new Error(`Segment ids should be Tensor1D but received shape\n          ${s.shape}`);const o={data:r,indices:a,segmentIds:s};return Ga.runKernel(Kn,o)}}),sparseSegmentSum:as({sparseSegmentSum_:
/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e,t,n){const r=ts(e,"data","sparseSegmentSum"),a=ts(t,"indices","sparseSegmentSum","int32"),s=ts(n,"segmentIds","sparseSegmentSum","int32");if(r.rank<1)throw new Error("Data should be at least 1 dimensional but received scalar");if(1!==a.rank)throw new Error(`Indices should be Tensor1D but received shape\n         ${a.shape}`);if(1!==s.rank)throw new Error(`Segment ids should be Tensor1D but received shape\n         ${s.shape}`);const o={data:r,indices:a,segmentIds:s};return Ga.runKernel(Hn,o)}})},Pd={stringNGrams:as({stringNGrams_:
/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e,t,n,r,a,s,o,i){const u=ts(e,"data","stringNGrams","string");if("string"!==u.dtype)throw new Error("Data must be of datatype string");if(1!==u.shape.length)throw new Error(`Data must be a vector, saw: ${u.shape}`);const l=ts(t,"dataSplits","stringNGrams");if("int32"!==l.dtype)throw new Error("Data splits must be of datatype int32");const c={separator:n,nGramWidths:r,leftPad:a,rightPad:s,padWidth:o,preserveShortSequences:i},p={data:u,dataSplits:l},d=Ga.runKernel(er,p,c);return{nGrams:d[0],nGramsSplits:d[1]}}}),stringSplit:as({stringSplit_:
/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e,t,n=!0){const r=ts(e,"input","stringSplit","string"),a=ts(t,"delimiter","stringSplit","string");if(1!==r.rank)throw new Error(`Input should be Tensor1D but received shape ${r.shape}`);if(0!==a.rank)throw new Error(`Delimiter should be a scalar but received shape ${a.shape}`);const s={skipEmpty:n},o={input:r,delimiter:a},i=Ga.runKernel(tr,o,s);return{indices:i[0],values:i[1],shape:i[2]}}}),stringToHashBucketFast:as({stringToHashBucketFast_:
/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e,t){const n=ts(e,"input","stringToHashBucketFast","string"),r={numBuckets:t};if(t<=0)throw new Error("Number of buckets must be at least 1");const a={input:n};return Ga.runKernel(nr,a,r)}}),staticRegexReplace:as({staticRegexReplace_:
/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function(e,t,n,r=!0){const a=ts(e,"input","staticRegexReplace","string"),s={pattern:t,rewrite:n,replaceGlobal:r};return Ga.runKernel(Yn,{x:a},s)}})},Vd=new Map,Ud=new Map;
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class jd{getClassName(){return this.constructor.className}static fromConfig(e,t){return new e(t)}}class Wd{constructor(){this.classNameMap={}}static getMap(){return null==Wd.instance&&(Wd.instance=new Wd),Wd.instance}static register(e){Wd.getMap().classNameMap[e.className]=[e,e.fromConfig]}}function Gd(e,t,n){p(null!=e.className,()=>"Class being registered does not have the static className property defined."),p("string"==typeof e.className,()=>"className is required to be a string, but got type "+typeof e.className),p(e.className.length>0,()=>"Class being registered has an empty-string as its className, which is disallowed."),void 0===t&&(t="Custom"),void 0===n&&(n=e.className);const r=t+">"+n;return Wd.register(e),Vd.set(r,e),Ud.set(e,r),e}const qd=Object.freeze(Object.defineProperty({__proto__:null,Serializable:jd,SerializationMap:Wd,getRegisteredName:function(e){return Ud.has(e)?Ud.get(e):e.className},registerClass:Gd},Symbol.toStringTag,{value:"Module"}));
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Kd extends jd{minimize(e,t=!1,n){const{value:r,grads:a}=this.computeGradients(e,n);if(null!=n){const e=n.map(e=>({name:e.name,tensor:a[e.name]}));this.applyGradients(e)}else this.applyGradients(a);return ws(a),t?r:(r.dispose(),null)}get iterations(){return null==this.iterations_&&(this.iterations_=0),this.iterations_}incrementIterations(){this.iterations_=this.iterations+1}computeGradients(e,t){return Xu(e,t)}dispose(){null!=this.iterations_&&ws(this.iterations_)}async saveIterations(){return null==this.iterations_&&(this.iterations_=0),{name:"iter",tensor:xu(this.iterations_,"int32")}}async getWeights(){throw new Error("getWeights() is not implemented for this optimizer yet.")}async setWeights(e){throw new Error(`setWeights() is not implemented for this optimizer class ${this.getClassName()}`)}async extractIterations(e){return this.iterations_=(await e[0].tensor.data())[0],e.slice(1)}}Object.defineProperty(Kd,Symbol.hasInstance,{value:e=>null!=e.minimize&&null!=e.computeGradients&&null!=e.applyGradients});
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
class Hd extends Kd{static get className(){return"Adadelta"}constructor(e,t,n=null){super(),this.learningRate=e,this.rho=t,this.epsilon=n,this.accumulatedGrads=[],this.accumulatedUpdates=[],null==n&&(this.epsilon=Ga.backend.epsilon())}applyGradients(e){(Array.isArray(e)?e.map(e=>e.name):Object.keys(e)).forEach((t,n)=>{const r=Ga.registeredVariables[t],a=!1;null==this.accumulatedGrads[n]&&(this.accumulatedGrads[n]={originalName:`${t}/accum_grad`,variable:bs(()=>nu(r).variable(a))}),null==this.accumulatedUpdates[n]&&(this.accumulatedUpdates[n]={originalName:`${t}/accum_var`,variable:bs(()=>nu(r).variable(a))});const s=Array.isArray(e)?e[n].tensor:e[t];if(null==s)return;const o=this.accumulatedGrads[n].variable,i=this.accumulatedUpdates[n].variable;bs(()=>{const e=$o(Ro(o,this.rho),Ro(Su(s),1-this.rho)),t=Ro(Do(Nu($o(i,this.epsilon)),Nu($o(o,this.epsilon))),s),n=$o(Ro(i,this.rho),Ro(Su(t),1-this.rho));o.assign(e),i.assign(n);const a=$o(Ro(t,-this.learningRate),r);r.assign(a)})}),this.incrementIterations()}dispose(){null!=this.accumulatedUpdates&&(ws(this.accumulatedGrads.map(e=>e.variable)),ws(this.accumulatedUpdates.map(e=>e.variable)))}async getWeights(){const e=[...this.accumulatedGrads,...this.accumulatedUpdates];return[await this.saveIterations()].concat(e.map(e=>({name:e.originalName,tensor:e.variable})))}async setWeights(e){const t=(e=await this.extractIterations(e)).length/2,n=!1;this.accumulatedGrads=e.slice(0,t).map(e=>({originalName:e.name,variable:e.tensor.variable(n)})),this.accumulatedUpdates=e.slice(t,2*t).map(e=>({originalName:e.name,variable:e.tensor.variable(n)}))}getConfig(){return{learningRate:this.learningRate,rho:this.rho,epsilon:this.epsilon}}static fromConfig(e,t){return new e(t.learningRate,t.rho,t.epsilon)}}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Zd extends Kd{static get className(){return"Adagrad"}constructor(e,t=.1){super(),this.learningRate=e,this.initialAccumulatorValue=t,this.accumulatedGrads=[]}applyGradients(e){(Array.isArray(e)?e.map(e=>e.name):Object.keys(e)).forEach((t,n)=>{const r=Ga.registeredVariables[t];if(null==this.accumulatedGrads[n]){const e=!1;this.accumulatedGrads[n]={originalName:`${t}/accumulator`,variable:bs(()=>Ii(r.shape,this.initialAccumulatorValue).variable(e))}}const a=Array.isArray(e)?e[n].tensor:e[t];if(null==a)return;const s=this.accumulatedGrads[n].variable;bs(()=>{const e=$o(s,Su(a));s.assign(e);const t=$o(Ro(Do(a,Nu($o(e,Ga.backend.epsilon()))),-this.learningRate),r);r.assign(t)})}),this.incrementIterations()}dispose(){null!=this.accumulatedGrads&&ws(this.accumulatedGrads.map(e=>e.variable))}async getWeights(){return[await this.saveIterations()].concat(this.accumulatedGrads.map(e=>({name:e.originalName,tensor:e.variable})))}async setWeights(e){e=await this.extractIterations(e);this.accumulatedGrads=e.map(e=>({originalName:e.name,variable:e.tensor.variable(false)}))}getConfig(){return{learningRate:this.learningRate,initialAccumulatorValue:this.initialAccumulatorValue}}static fromConfig(e,t){return new e(t.learningRate,t.initialAccumulatorValue)}}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Jd extends Kd{static get className(){return"Adam"}constructor(e,t,n,r=null){super(),this.learningRate=e,this.beta1=t,this.beta2=n,this.epsilon=r,this.accumulatedFirstMoment=[],this.accumulatedSecondMoment=[],bs(()=>{this.accBeta1=xu(t).variable(),this.accBeta2=xu(n).variable()}),null==r&&(this.epsilon=Ga.backend.epsilon())}applyGradients(e){const t=Array.isArray(e)?e.map(e=>e.name):Object.keys(e);bs(()=>{const n=rl(1,this.accBeta1),r=rl(1,this.accBeta2);t.forEach((t,a)=>{const s=Ga.registeredVariables[t],o=!1;null==this.accumulatedFirstMoment[a]&&(this.accumulatedFirstMoment[a]={originalName:`${t}/m`,variable:bs(()=>nu(s).variable(o))}),null==this.accumulatedSecondMoment[a]&&(this.accumulatedSecondMoment[a]={originalName:`${t}/v`,variable:bs(()=>nu(s).variable(o))});const i=Array.isArray(e)?e[a].tensor:e[t];if(null==i)return;const u=this.accumulatedFirstMoment[a].variable,l=this.accumulatedSecondMoment[a].variable,c=$o(Ro(u,this.beta1),Ro(i,1-this.beta1)),p=$o(Ro(l,this.beta2),Ro(Su(i),1-this.beta2)),d=Do(c,n),h=Do(p,r);u.assign(c),l.assign(p);const m=$o(Ro(Do(d,$o(Nu(h),this.epsilon)),-this.learningRate),s);s.assign(m)}),this.accBeta1.assign(Ro(this.accBeta1,this.beta1)),this.accBeta2.assign(Ro(this.accBeta2,this.beta2))}),this.incrementIterations()}dispose(){this.accBeta1.dispose(),this.accBeta2.dispose(),null!=this.accumulatedFirstMoment&&ws(this.accumulatedFirstMoment.map(e=>e.variable)),null!=this.accumulatedSecondMoment&&ws(this.accumulatedSecondMoment.map(e=>e.variable))}async getWeights(){const e=[...this.accumulatedFirstMoment,...this.accumulatedSecondMoment];return[await this.saveIterations()].concat(e.map(e=>({name:e.originalName,tensor:e.variable})))}async setWeights(e){e=await this.extractIterations(e),bs(()=>{this.accBeta1.assign(wu(this.beta1,this.iterations_+1)),this.accBeta2.assign(wu(this.beta2,this.iterations_+1))});const t=e.length/2,n=!1;this.accumulatedFirstMoment=e.slice(0,t).map(e=>({originalName:e.name,variable:e.tensor.variable(n)})),this.accumulatedSecondMoment=e.slice(t,2*t).map(e=>({originalName:e.name,variable:e.tensor.variable(n)}))}getConfig(){return{learningRate:this.learningRate,beta1:this.beta1,beta2:this.beta2,epsilon:this.epsilon}}static fromConfig(e,t){return new e(t.learningRate,t.beta1,t.beta2,t.epsilon)}}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Xd extends Kd{static get className(){return"Adamax"}constructor(e,t,n,r=null,a=0){super(),this.learningRate=e,this.beta1=t,this.beta2=n,this.epsilon=r,this.decay=a,this.accumulatedFirstMoment=[],this.accumulatedWeightedInfNorm=[],bs(()=>{this.iteration=xu(0).variable(),this.accBeta1=xu(t).variable()}),null==r&&(this.epsilon=Ga.backend.epsilon())}applyGradients(e){const t=Array.isArray(e)?e.map(e=>e.name):Object.keys(e);bs(()=>{const n=rl(1,this.accBeta1),r=Do(-this.learningRate,$o(Ro(this.iteration,this.decay),1));t.forEach((t,a)=>{const s=Ga.registeredVariables[t],o=!1;null==this.accumulatedFirstMoment[a]&&(this.accumulatedFirstMoment[a]={originalName:`${t}/m`,variable:nu(s).variable(o)}),null==this.accumulatedWeightedInfNorm[a]&&(this.accumulatedWeightedInfNorm[a]={originalName:`${t}/v`,variable:nu(s).variable(o)});const i=Array.isArray(e)?e[a].tensor:e[t];if(null==i)return;const u=this.accumulatedFirstMoment[a].variable,l=this.accumulatedWeightedInfNorm[a].variable,c=$o(Ro(u,this.beta1),Ro(i,1-this.beta1)),p=Ro(l,this.beta2),d=Co(i),h=gl(p,d);u.assign(c),l.assign(h);const m=$o(Ro(Do(r,n),Do(c,$o(h,this.epsilon))),s);s.assign(m)}),this.iteration.assign($o(this.iteration,1)),this.accBeta1.assign(Ro(this.accBeta1,this.beta1))}),this.incrementIterations()}dispose(){this.accBeta1.dispose(),this.iteration.dispose(),null!=this.accumulatedFirstMoment&&ws(this.accumulatedFirstMoment.map(e=>e.variable)),null!=this.accumulatedWeightedInfNorm&&ws(this.accumulatedWeightedInfNorm.map(e=>e.variable))}async getWeights(){throw new Error("getWeights() is not implemented for Adamax yet.")}async setWeights(e){throw new Error("setWeights() is not implemented for Adamax yet.")}getConfig(){return{learningRate:this.learningRate,beta1:this.beta1,beta2:this.beta2,epsilon:this.epsilon,decay:this.decay}}static fromConfig(e,t){return new e(t.learningRate,t.beta1,t.beta2,t.epsilon,t.decay)}}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Yd extends Kd{static get className(){return"SGD"}constructor(e){super(),this.learningRate=e,this.setLearningRate(e)}applyGradients(e){(Array.isArray(e)?e.map(e=>e.name):Object.keys(e)).forEach((t,n)=>{const r=Array.isArray(e)?e[n].tensor:e[t];if(null==r)return;const a=Ga.registeredVariables[t];bs(()=>{const e=$o(Ro(this.c,r),a);a.assign(e)})}),this.incrementIterations()}setLearningRate(e){this.learningRate=e,null!=this.c&&this.c.dispose(),this.c=xs(xu(-e))}dispose(){this.c.dispose()}async getWeights(){return[await this.saveIterations()]}async setWeights(e){if(0!==(e=await this.extractIterations(e)).length)throw new Error("SGD optimizer does not have settable weights.")}getConfig(){return{learningRate:this.learningRate}}static fromConfig(e,t){return new e(t.learningRate)}}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Qd extends Yd{static get className(){return"Momentum"}constructor(e,t,n=!1){super(e),this.learningRate=e,this.momentum=t,this.useNesterov=n,this.accumulations=[],this.m=xu(this.momentum)}applyGradients(e){(Array.isArray(e)?e.map(e=>e.name):Object.keys(e)).forEach((t,n)=>{const r=Ga.registeredVariables[t];if(null==this.accumulations[n]){const e=!1;this.accumulations[n]={originalName:`${t}/momentum`,variable:bs(()=>nu(r).variable(e))}}const a=this.accumulations[n].variable,s=Array.isArray(e)?e[n].tensor:e[t];null!=s&&bs(()=>{let e;const t=$o(Ro(this.m,a),s);e=this.useNesterov?$o(Ro(this.c,$o(s,Ro(t,this.m))),r):$o(Ro(this.c,t),r),a.assign(t),r.assign(e)})}),this.incrementIterations()}dispose(){this.m.dispose(),null!=this.accumulations&&ws(this.accumulations.map(e=>e.variable))}setMomentum(e){this.momentum=e}async getWeights(){return[await this.saveIterations()].concat(this.accumulations.map(e=>({name:e.originalName,tensor:e.variable})))}async setWeights(e){e=await this.extractIterations(e);this.accumulations=e.map(e=>({originalName:e.name,variable:e.tensor.variable(false)}))}getConfig(){return{learningRate:this.learningRate,momentum:this.momentum,useNesterov:this.useNesterov}}static fromConfig(e,t){return new e(t.learningRate,t.momentum,t.useNesterov)}}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class eh extends Kd{static get className(){return"RMSProp"}constructor(e,t=.9,n=0,r=null,a=!1){if(super(),this.learningRate=e,this.decay=t,this.momentum=n,this.epsilon=r,this.accumulatedMeanSquares=[],this.accumulatedMoments=[],this.accumulatedMeanGrads=[],this.centered=a,null==r&&(this.epsilon=Ga.backend.epsilon()),null==e)throw new Error("learningRate for RMSPropOptimizer must be defined.")}applyGradients(e){(Array.isArray(e)?e.map(e=>e.name):Object.keys(e)).forEach((t,n)=>{const r=Ga.registeredVariables[t],a=!1;null==this.accumulatedMeanSquares[n]&&(this.accumulatedMeanSquares[n]={originalName:`${t}/rms`,variable:bs(()=>nu(r).variable(a))}),null==this.accumulatedMoments[n]&&(this.accumulatedMoments[n]={originalName:`${t}/momentum`,variable:bs(()=>nu(r).variable(a))}),null==this.accumulatedMeanGrads[n]&&this.centered&&(this.accumulatedMeanGrads[n]={originalName:`${t}/mg`,variable:bs(()=>nu(r).variable(a))});const s=Array.isArray(e)?e[n].tensor:e[t];if(null==s)return;const o=this.accumulatedMeanSquares[n].variable,i=this.accumulatedMoments[n].variable;bs(()=>{const e=$o(Ro(o,this.decay),Ro(Su(s),1-this.decay));if(this.centered){const t=this.accumulatedMeanGrads[n].variable,a=$o(Ro(t,this.decay),Ro(s,1-this.decay)),u=Do(Ro(s,this.learningRate),Nu(rl(e,$o(Su(a),this.epsilon)))),l=$o(Ro(i,this.momentum),u);o.assign(e),t.assign(a),i.assign(l);const c=rl(r,l);r.assign(c)}else{const e=$o(Ro(o,this.decay),Ro(Su(s),1-this.decay)),t=$o(Ro(i,this.momentum),Do(Ro(s,this.learningRate),Nu($o(e,this.epsilon))));o.assign(e),i.assign(t);const n=rl(r,t);r.assign(n)}})}),this.incrementIterations()}dispose(){null!=this.accumulatedMeanSquares&&ws(this.accumulatedMeanSquares.map(e=>e.variable)),null!=this.accumulatedMeanGrads&&this.centered&&ws(this.accumulatedMeanGrads.map(e=>e.variable)),null!=this.accumulatedMoments&&ws(this.accumulatedMoments.map(e=>e.variable))}async getWeights(){const e=[...this.accumulatedMeanSquares,...this.accumulatedMoments];return this.centered&&e.push(...this.accumulatedMeanGrads),[await this.saveIterations()].concat(e.map(e=>({name:e.originalName,tensor:e.variable})))}async setWeights(e){e=await this.extractIterations(e);const t=this.centered?e.length/3:e.length/2,n=!1;this.accumulatedMeanSquares=e.slice(0,t).map(e=>({originalName:e.name,variable:e.tensor.variable(n)})),this.accumulatedMoments=e.slice(t,2*t).map(e=>({originalName:e.name,variable:e.tensor.variable(n)})),this.centered&&(this.accumulatedMeanGrads=e.slice(2*t,3*t).map(e=>({originalName:e.name,variable:e.tensor.variable(n)})))}getConfig(){return{learningRate:this.learningRate,decay:this.decay,momentum:this.momentum,epsilon:this.epsilon,centered:this.centered}}static fromConfig(e,t){return new e(t.learningRate,t.decay,t.momentum,t.epsilon,t.centered)}}
/**
 * @license
 * Copyright 2022 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const th=[Hd,Zd,Jd,Xd,Qd,eh,Yd];function nh(e){return new Promise(e=>setTimeout(e)).then(e)}class rh{constructor(e){if(!X().getBool("IS_BROWSER"))throw new Error("browserDownloads() cannot proceed because the current environment is not a browser.");e.startsWith(rh.URL_SCHEME)&&(e=e.slice(rh.URL_SCHEME.length)),null!=e&&0!==e.length||(e="model"),this.modelJsonFileName=e+".json",this.weightDataFileName=e+".weights.bin"}async save(e){if("undefined"==typeof document)throw new Error("Browser downloads are not supported in this environment since `document` is not present");const t=ls.join(e.weightData),n=window.URL.createObjectURL(new Blob([t],{type:"application/octet-stream"}));if(e.modelTopology instanceof ArrayBuffer)throw new Error("BrowserDownloads.save() does not support saving model topology in binary formats yet.");{const t=js(e,[{paths:["./"+this.weightDataFileName],weights:e.weightSpecs}]),r=window.URL.createObjectURL(new Blob([JSON.stringify(t)],{type:"application/json"})),a=null==this.modelJsonAnchor?document.createElement("a"):this.modelJsonAnchor;if(a.download=this.modelJsonFileName,a.href=r,await nh(()=>a.dispatchEvent(new MouseEvent("click"))),null!=e.weightData){const e=null==this.weightDataAnchor?document.createElement("a"):this.weightDataAnchor;e.download=this.weightDataFileName,e.href=n,await nh(()=>e.dispatchEvent(new MouseEvent("click")))}return{modelArtifactsInfo:qs(e)}}}}rh.URL_SCHEME="downloads://";class ah{constructor(e){if(null==e||e.length<1)throw new Error(`When calling browserFiles, at least 1 file is required, but received ${e}`);this.jsonFile=e[0],this.weightsFiles=e.slice(1)}async load(){return new Promise((e,t)=>{const n=new FileReader;n.onload=n=>{const r=JSON.parse(n.target.result),a=r.modelTopology;if(null==a)return void t(new Error(`modelTopology field is missing from file ${this.jsonFile.name}`));if(null==r.weightsManifest)return void t(new Error(`weightManifest field is missing from file ${this.jsonFile.name}`));if(0===this.weightsFiles.length)return void e({modelTopology:a});const s=Gs(r,e=>this.loadWeights(e));e(s)},n.onerror=e=>t(`Failed to read model topology and weights manifest JSON from file '${this.jsonFile.name}'. BrowserFiles supports loading Keras-style tf.Model artifacts only.`),n.readAsText(this.jsonFile)})}loadWeights(e){const t=[],n=[];for(const s of e)t.push(...s.weights),n.push(...s.paths);const r=this.checkManifestAndWeightFiles(e),a=n.map(e=>this.loadWeightsFile(e,r[e]));return Promise.all(a).then(e=>[t,e])}loadWeightsFile(e,t){return new Promise((n,r)=>{const a=new FileReader;a.onload=e=>{const t=e.target.result;n(t)},a.onerror=t=>r(`Failed to weights data from file of path '${e}'.`),a.readAsArrayBuffer(t)})}checkManifestAndWeightFiles(e){const t=[],n=this.weightsFiles.map(e=>Us(e.name)),r={};for(const a of e)a.paths.forEach(e=>{const a=Us(e);if(-1!==t.indexOf(a))throw new Error(`Duplicate file basename found in weights manifest: '${a}'`);if(t.push(a),-1===n.indexOf(a))throw new Error(`Weight file with basename '${a}' is not provided.`);r[e]=this.weightsFiles[n.indexOf(a)]});if(t.length!==this.weightsFiles.length)throw new Error(`Mismatch in the number of files in weights manifest (${t.length}) and the number of weight files provided (${this.weightsFiles.length}).`);return r}}
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function sh(e,t,n,r){var a,s,o;p(null!=(a=e)&&Array.isArray(a)&&a.length>0,()=>"promises must be a none empty array"),o=r=null==r?1:r,p((s=n=null==n?0:n)>=0&&s<=1,()=>`Progress fraction must be in range [0, 1], but got startFraction ${s}`),p(o>=0&&o<=1,()=>`Progress fraction must be in range [0, 1], but got endFraction ${o}`),p(o>=s,()=>`startFraction must be no more than endFraction, but got startFraction ${s} and endFraction ${o}`);let i=0;return Promise.all(e.map(a=>(a.then(a=>{const s=n+ ++i/e.length*(r-n);return t(s),a}),a)))}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */async function oh(e,t){null==t&&(t={});const n=null==t.fetchFunc?X().platform.fetch:t.fetchFunc,r=e.map(e=>n(e,t.requestInit,{isBinary:!0})),a=(null==t.onProgress?await Promise.all(r):await sh(r,t.onProgress,0,.5)).map(e=>e.arrayBuffer());return null==t.onProgress?await Promise.all(a):await sh(a,t.onProgress,.5,1)}async function ih(e,t="",n,r){return uh(e=>oh(e,{requestInit:r}))(e,t,n)}function uh(e){return async(t,n="",r)=>{const a=t.map(()=>!1),s={},o=null!=r?r.map(()=>!1):[],i=[];if(t.forEach((e,t)=>{let n=0;e.weights.forEach(e=>{const u="quantization"in e?e.quantization.dtype:e.dtype,l=us[u]*m(e.shape),c=()=>{a[t]=!0,null==s[t]&&(s[t]=[]),s[t].push({manifestEntry:e,groupOffset:n,sizeBytes:l})};null!=r?r.forEach((t,n)=>{t===e.name&&(c(),o[n]=!0)}):c(),i.push(e.name),n+=l})}),!o.every(e=>e)){const e=r.filter((e,t)=>!o[t]);throw new Error(`Could not find weights in manifest with names: ${e.join(", ")}. \nManifest JSON has weights with names: ${i.join(", ")}.`)}const u=a.reduce((e,t,n)=>(t&&e.push(n),e),[]),l=[];u.forEach(e=>{t[e].paths.forEach(e=>{const t=n+(n.endsWith("/")?"":"/")+e;l.push(t)})});const c=await e(l),p={};let d=0;return u.forEach(e=>{const n=t[e].paths.length,r=new ls(c.slice(d,d+n));s[e].forEach(e=>{const t=Os(r.slice(e.groupOffset,e.groupOffset+e.sizeBytes),[e.manifestEntry]);for(const n in t)p[n]=t[n]}),d+=n}),p}}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */Hs.registerSaveRouter(e=>X().getBool("IS_BROWSER")&&!Array.isArray(e)&&e.startsWith(rh.URL_SCHEME)?function(e="model"){return new rh(e)}(e.slice(rh.URL_SCHEME.length)):null);class lh{constructor(e,t){if(this.DEFAULT_METHOD="POST",null==t&&(t={}),this.weightPathPrefix=t.weightPathPrefix,this.weightUrlConverter=t.weightUrlConverter,null!=t.fetchFunc?(p("function"==typeof t.fetchFunc,()=>"Must pass a function that matches the signature of `fetch` (see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)"),this.fetch=t.fetchFunc):this.fetch=X().platform.fetch,p(null!=e&&e.length>0,()=>"URL path for http must not be null, undefined or empty."),Array.isArray(e)&&p(2===e.length,()=>`URL paths for http must have a length of 2, (actual length is ${e.length}).`),this.path=e,null!=t.requestInit&&null!=t.requestInit.body)throw new Error("requestInit is expected to have no pre-existing body, but has one.");this.requestInit=t.requestInit||{},this.loadOptions=t}async save(e){if(e.modelTopology instanceof ArrayBuffer)throw new Error("BrowserHTTPRequest.save() does not support saving model topology in binary formats yet.");const t=Object.assign({method:this.DEFAULT_METHOD},this.requestInit);t.body=new FormData;const n=js(e,[{paths:["./model.weights.bin"],weights:e.weightSpecs}]);if(t.body.append("model.json",new Blob([JSON.stringify(n)],{type:"application/json"}),"model.json"),null!=e.weightData){const n=ls.join(e.weightData);t.body.append("model.weights.bin",new Blob([n],{type:"application/octet-stream"}),"model.weights.bin")}const r=await this.fetch(this.path,t);if(r.ok)return{modelArtifactsInfo:qs(e),responses:[r]};throw new Error(`BrowserHTTPRequest.save() failed due to HTTP response status ${r.status}.`)}async loadModelJSON(){const e=await this.fetch(this.path,this.requestInit);if(!e.ok)throw new Error(`Request to ${this.path} failed with status code ${e.status}. Please verify this URL points to the model JSON of the model to load.`);let t;try{t=await e.json()}catch(a){let e=`Failed to parse model JSON of response from ${this.path}.`;throw this.path.endsWith(".pb")?e+=" Your path contains a .pb file extension. Support for .pb models have been removed in TensorFlow.js 1.0 in favor of .json models. You can re-convert your Python TensorFlow model using the TensorFlow.js 1.0 conversion scripts or you can convert your.pb models with the 'pb2json'NPM script in the tensorflow/tfjs-converter repository.":e+=" Please make sure the server is serving valid JSON for this request.",new Error(e)}const n=t.modelTopology,r=t.weightsManifest;if(null==n&&null==r)throw new Error(`The JSON from HTTP path ${this.path} contains neither model topology or manifest for weights.`);return t}async load(){if(this.loadOptions.streamWeights)return this.loadStream();return Gs(await this.loadModelJSON(),e=>this.loadWeights(e))}async loadStream(){const e=await this.loadModelJSON(),t=await this.getWeightUrls(e.weightsManifest),n=Ks(e.weightsManifest);return Object.assign(Object.assign({},e),{weightSpecs:n,getWeightStream:()=>function(e,t){var n;const r=null==t.fetchFunc?X().platform.fetch:t.fetchFunc;let a,s=0;return null===(n=t.onProgress)||void 0===n||n.call(t,0),new ReadableStream({pull:async n=>{for(var o;s<e.length;){if(!a){const n=(await r(e[s],t.requestInit,{isBinary:!0})).body;a=n.getReader()}const{done:i,value:u}=await a.read();if(!i)return void n.enqueue(u);s++,a=void 0,null===(o=t.onProgress)||void 0===o||o.call(t,s/e.length)}n.close()}})}(t,this.loadOptions)})}async getWeightUrls(e){const t=Array.isArray(this.path)?this.path[1]:this.path,[n,r]=function(e){const t=e.lastIndexOf("/"),n=e.lastIndexOf("?"),r=e.substring(0,t),a=n>t?e.substring(n):"";return[r+"/",a]}(t),a=this.weightPathPrefix||n,s=[],o=[];for(const i of e)for(const e of i.paths)null!=this.weightUrlConverter?o.push(this.weightUrlConverter(e)):s.push(a+e+r);return this.weightUrlConverter&&s.push(...await Promise.all(o)),s}async loadWeights(e){const t=await this.getWeightUrls(e);return[Ks(e),await oh(t,this.loadOptions)]}}function ch(e){return null!=e.match(lh.URL_SCHEME_REGEX)}lh.URL_SCHEME_REGEX=/^https?:\/\//;const ph=(e,t)=>{if("undefined"==typeof fetch&&(null==t||null==t.fetchFunc))return null;{let n=!0;if(n=Array.isArray(e)?e.every(e=>ch(e)):ch(e),n)return dh(e,t)}return null};function dh(e,t){return new lh(e,t)}function hh(e,t){return dh(e,t)}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */Hs.registerSaveRouter(ph),Hs.registerLoadRouter(ph);class mh{constructor(e){this.modelArtifacts=e}load(){return this.modelArtifacts}}class fh{constructor(e){this.saveHandler=e}save(e){return this.saveHandler(e)}}class gh{constructor(e){e.load&&(this.load=()=>Promise.resolve(e.load())),e.save&&(this.save=t=>Promise.resolve(e.save(t)))}}function yh(e,t,n,r){if(1===arguments.length){const t=null!=e.modelTopology||null!=e.weightSpecs;return new mh(t?e:{modelTopology:e})}return new mh({modelTopology:e,weightSpecs:t,weightData:n,trainingConfig:r})}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
const bh=Object.freeze(Object.defineProperty({__proto__:null,CompositeArrayBuffer:ls,browserFiles:function(e){return new ah(e)},browserHTTPRequest:hh,concatenateArrayBuffers:Vs,copyModel:async function(e,t){return So(e,t,!1)},decodeWeights:Os,decodeWeightsStream:Bs,encodeWeights:$s,fromMemory:function(e,t,n,r){return new gh(yh(...arguments))},fromMemorySync:yh,getLoadHandlers:Js,getModelArtifactsForJSON:Gs,getModelArtifactsForJSONSync:Ws,getModelArtifactsInfoForJSON:qs,getSaveHandlers:Zs,getWeightSpecs:Ks,http:dh,isHTTPScheme:ch,listModels:async function(){const e=xo.getSchemes(),t={};for(const n of e){const e=await xo.getManager(n).listModels();for(const r in e){t[n+wo+r]=e[r]}}return t},loadWeights:ih,moveModel:async function(e,t){return So(e,t,!0)},registerLoadRouter:e=>Hs.registerLoadRouter(e),registerSaveRouter:e=>Hs.registerSaveRouter(e),removeModel:async function(e){const t=No(e);return xo.getManager(t.scheme).removeModel(t.path)},weightsLoaderFactory:uh,withSaveHandler:function(e){return new fh(e)},withSaveHandlerSync:function(e){return new fh(e)}},Symbol.toStringTag,{value:"Module"}));
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const wh=as({confusionMatrix_:function(e,t,n){const r=ts(e,"labels","confusionMatrix"),a=ts(t,"predictions","confusionMatrix");p(null==n||n>0&&Number.isInteger(n),()=>`If provided, numClasses must be a positive integer, but got ${n}`),p(1===r.rank,()=>`Expected the rank of labels to be 1, but got ${r.rank}`),p(1===a.rank,()=>`Expected the rank of predictions to be 1, but got ${a.rank}`),p(r.shape[0]===a.shape[0],()=>`Mismatch in the number of examples: ${r.shape[0]} vs. ${a.shape[0]}. Labels and predictions should have the same number of elements.`),p(n>0&&Number.isInteger(n),()=>`numClasses is required to be a positive integer, but got ${n}`);const s=Il(Io(r,"int32"),n),o=Il(Io(a,"int32"),n),i=Tp(s),u=hi(i,o);return Io(u,"int32")}}),xh=Object.freeze(Object.defineProperty({__proto__:null,confusionMatrix:wh},Symbol.toStringTag,{value:"Module"}));
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
let Nh,Sh=!1;function vh(e,t=3){if(t>4)throw new Error("Cannot construct Tensor with more than 4 channels from pixels.");if(null==e)throw new Error("pixels passed to tf.browser.fromPixels() can not be null");let n=!1,r=!1,a=!1,s=!1,o=!1,i=!1;if(e.data instanceof Uint8Array)n=!0;else if("undefined"!=typeof ImageData&&e instanceof ImageData)r=!0;else if("undefined"!=typeof HTMLVideoElement&&e instanceof HTMLVideoElement)a=!0;else if("undefined"!=typeof HTMLImageElement&&e instanceof HTMLImageElement)s=!0;else if(null!=e.getContext)o=!0;else{if(!("undefined"!=typeof ImageBitmap&&e instanceof ImageBitmap))throw new Error(`pixels passed to tf.browser.fromPixels() must be either an HTMLVideoElement, HTMLImageElement, HTMLCanvasElement, ImageData in browser, or OffscreenCanvas, ImageData in webworker or {data: Uint32Array, width: number, height: number}, but was ${e.constructor.name}`);i=!0}if(null!=Tr(gr,Ga.backendName)){const n={pixels:e},r={numChannels:t};return Ga.runKernel(gr,n,r)}const[u,l]=a?[e.videoWidth,e.videoHeight]:[e.width,e.height];let c,p;if(o)c=e.getContext("2d").getImageData(0,0,u,l).data;else if(r||n)c=e.data;else if(s||a||i){if(null==Nh)if("undefined"==typeof document){if("undefined"==typeof OffscreenCanvas||"undefined"==typeof OffscreenCanvasRenderingContext2D)throw new Error("Cannot parse input in current context. Reason: OffscreenCanvas Context2D rendering is not supported.");Nh=new OffscreenCanvas(1,1).getContext("2d")}else Nh=document.createElement("canvas").getContext("2d",{willReadFrequently:!0});Nh.canvas.width=u,Nh.canvas.height=l,Nh.drawImage(e,0,0,u,l),c=Nh.getImageData(0,0,u,l).data}if(4===t)p=new Int32Array(c);else{const e=u*l;p=new Int32Array(e*t);for(let n=0;n<e;n++)for(let e=0;e<t;++e)p[n*t+e]=c[4*n+e]}return sp(p,[l,u,t],"int32")}function Th(e){return"undefined"!=typeof window&&"undefined"!=typeof ImageBitmap&&window.hasOwnProperty("createImageBitmap")&&!(e instanceof ImageBitmap)&&function(e){return null!=e&&0!==e.width&&0!==e.height}(e)&&!function(e){return null!=e&&e.data instanceof Uint8Array}(e)}function kh(e){if(2!==e.rank&&3!==e.rank)throw new Error(`toPixels only supports rank 2 or 3 tensors, got rank ${e.rank}.`);const t=2===e.rank?1:e.shape[2];if(t>4||2===t)throw new Error(`toPixels only supports depth of size 1, 3 or 4 but got ${t}`);if("float32"!==e.dtype&&"int32"!==e.dtype)throw new Error(`Unsupported type for toPixels: ${e.dtype}. Please use float32 or int32 tensors.`)}const Eh=as({fromPixels_:vh}),_h=Object.freeze(Object.defineProperty({__proto__:null,draw:function(e,t,n){let r=ts(e,"img","draw");if(!(e instanceof ya)){const e=r;r=Io(e,"int32"),e.dispose()}kh(r),function(e){const t=(null==e?void 0:e.alpha)||1;if(t>1||t<0)throw new Error(`Alpha value ${t} is suppoed to be in range [0 - 1].`)}(null==n?void 0:n.imageOptions);const a={image:r},s={canvas:t,options:n};Ga.runKernel(Ye,a,s)},fromPixels:Eh,fromPixelsAsync:async function(e,t=3){let n=null;if(X().getBool("WRAP_TO_IMAGEBITMAP")&&Th(e)){let t;try{t=await createImageBitmap(e,{premultiplyAlpha:"none"})}catch(r){t=null}n=null!=t&&t.width===e.width&&t.height===e.height?t:e}else n=e;return vh(n,t)},toPixels:async function(e,t){let n=ts(e,"img","toPixels");if(!(e instanceof ya)){const e=n;n=Io(e,"int32"),e.dispose()}kh(n);const[r,a]=n.shape.slice(0,2),s=2===n.rank?1:n.shape[2],o=await n.data(),i="float32"===n.dtype?255:1,u=new Uint8ClampedArray(a*r*4);for(let l=0;l<r*a;++l){const e=[0,0,0,255];for(let r=0;r<s;r++){const t=o[l*s+r];if("float32"===n.dtype){if(t<0||t>1)throw new Error(`Tensor values for a float32 Tensor must be in the range [0 - 1] but encountered ${t}.`)}else if("int32"===n.dtype&&(t<0||t>255))throw new Error(`Tensor values for a int32 Tensor must be in the range [0 - 255] but encountered ${t}.`);1===s?(e[0]=t*i,e[1]=t*i,e[2]=t*i):e[r]=t*i}const t=4*l;u[t+0]=Math.round(e[0]),u[t+1]=Math.round(e[1]),u[t+2]=Math.round(e[2]),u[t+3]=Math.round(e[3])}if(null!=t){if(!Sh){null!=Tr(Ye,Ga.backendName)&&(Sh=!0)}t.width=a,t.height=r;const e=t.getContext("2d"),n=new ImageData(u,a,r);e.putImageData(n,0,0)}return n!==e&&n.dispose(),u}},Symbol.toStringTag,{value:"Module"}));function Ih(e,t){const n=e.shape.length,r=t.shape.length;if(n<1)throw new Error(`tf.gatherND() expects the input to be rank 1 or higher, but the rank was ${n}.`);if(r<1)throw new Error(`tf.gatherND() expects the indices to be rank 1 or higher, but the rank was ${r}.`);if("int32"!==t.dtype)throw new Error(`tf.gatherND() expects the indices to be int32 type, but the dtype was ${t.dtype}.`);if(t.shape[r-1]>n)throw new Error(`index innermost dimension length must be <= tensor rank; saw: ${t.shape[r-1]} vs. ${n}`);if(0===m(e.shape))throw new Error(`Requested more than 0 entries, but input is empty. Input shape: ${e.shape}.`);const a=t.shape,s=a[a.length-1];let o=1;for(let p=0;p<a.length-1;++p)o*=a[p];const i=e.shape,u=a.slice();u.pop();let l=1;for(let p=s;p<n;++p)l*=i[p],u.push(i[p]);const c=[...B(e.shape).map(e=>e/l),1].slice(0,s);return[u,o,l,c]}const Ah=Object.freeze(Object.defineProperty({__proto__:null,prepareAndValidate:Ih},Symbol.toStringTag,{value:"Module"}));
/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Mh(e,t,n){const r=e.shape.length;p(r===t.length,()=>`Error in slice${r}D: Length of begin ${t} must match the rank of the array (${r}).`),p(r===n.length,()=>`Error in slice${r}D: Length of size ${n} must match the rank of the array (${r}).`);for(let a=0;a<r;++a)p(t[a]+n[a]<=e.shape[a],()=>`Error in slice${r}D: begin[${a}] + size[${a}] (${t[a]+n[a]}) would overflow input.shape[${a}] (${e.shape[a]})`)}function $h(e,t,n){const r=[];for(let a=0;a<e.length;a++)r[a]=Math.ceil((t[a]-e[a])/n[a]);return r}function Oh(e,t,n,r){const a=[...e];for(let s=a.length;s<r.length;s++)a.push(1);for(let s=0;s<n;s++)0===s?a[t]=1:(a.splice(t,0,1),a.pop());return a}function Dh(e,t,n){return n<=e?n:n-(t-1)}function Rh(e,t){const n=[];for(let r=0;r<e;r++)n.push(t+r);return n}function Ch(e,t,n,r,a){const s=[...a],o=Rh(n,t);for(let i=0;i<s.length;i++)if(o.indexOf(i)>-1)s[i]=0;else{const a=Dh(t,n,i);let o=r[a];e&1<<a&&(o=0),s[i]=o}return s}function Fh(e,t,n,r,a){const s=[...a],o=Rh(n,t);for(let i=0;i<s.length;i++)if(o.indexOf(i)>-1)s[i]=Number.MAX_SAFE_INTEGER;else{const a=Dh(t,n,i);let o=r[a];e&1<<a&&(o=Number.MAX_SAFE_INTEGER),s[i]=o}for(let u=0;u<s.length;u++){const e=a[u];s[u]<0&&(s[u]+=e),s[u]=i(0,s[u],a[u])}return s}function Bh(e,t,n){let r=e[t];return(n&1<<t||null==r)&&(r=1),r}function zh(e,t,n,r,a,s){let o=t[a];const u=n[a]||1;(e&1<<a||s&1<<a||null==o)&&(o=u>0?Number.MIN_SAFE_INTEGER:Number.MAX_SAFE_INTEGER);const l=r[a];return o<0&&(o+=l),o=i(0,o,l-1),o}function Lh(e,t,n,r,a,s){let o=t[a];const u=n[a]||1;(e&1<<a||s&1<<a||null==o)&&(o=u>0?Number.MAX_SAFE_INTEGER:Number.MIN_SAFE_INTEGER);const l=r[a];return o<0&&(o+=l),o=u>0?i(0,o,l):i(-1,o,l-1),o}function Ph(e,t,n){let r=n.length;for(let a=0;a<n.length;a++)if(n[a]>1){r=a;break}for(let a=r+1;a<n.length;a++)if(t[a]>0||n[a]!==e[a])return!1;return!0}function Vh(e,t){let n=e.length>0?e[e.length-1]:1;for(let r=0;r<e.length-1;r++)n+=e[r]*t[r];return n}function Uh(e,t,n){let r;const a=e.shape.length;let s;return r="number"==typeof t?[t,...new Array(a-1).fill(0)]:t.length<a?t.concat(new Array(a-t.length).fill(0)):t.slice(),r.forEach(e=>{p(-1!==e,()=>"slice() does not support negative begin indexing.")}),s=null==n?new Array(a).fill(-1):"number"==typeof n?[n,...new Array(a-1).fill(-1)]:n.length<a?n.concat(new Array(a-n.length).fill(-1)):n,s=s.map((t,n)=>t>=0?t:(p(-1===t,()=>`Negative size values should be exactly -1 but got ${t} for the slice() size at index ${n}.`),e.shape[n]-r[n])),[r,s]}function jh(e,t,n,r,a,s,o,i,u){let l;if(null==r?(l=new Array(t.length),l.fill(1)):l=r,null!=o&&o&o-1)throw new Error("Multiple ellipses in slice is not allowed.");let c=!1;const p={dims:l.length,numAddAxisAfterEllipsis:0,begin:t.slice(),end:n.slice(),strides:l.slice(),beginMask:a,endMask:s,ellipsisMask:o,newAxisMask:i,shrinkAxisMask:u};for(let b=0;b<p.dims;b++)c&&1<<b&i&&p.numAddAxisAfterEllipsis++,1<<b&o&&(c=!0);c||(p.ellipsisMask|=1<<p.dims,p.dims++);const d={dims:e.length,beginMask:0,endMask:0,beginValid:!1,endValid:!1};!function(e,t){t.beginMask=0,t.endMask=0,t.shrinkAxisMask=0;let n=0;t.beginValid=null!=e.begin,t.endValid=null!=e.end,t.begin=new Array(t.dims),t.end=new Array(t.dims),t.strides=new Array(t.dims),t.finalShapeGatherIndices=[],t.finalShapeGatherIndicesSparse=[],t.inputShapeGatherIndicesSparse=new Array(t.dims);for(let r=0;r<e.dims;r++)if(1<<r&e.ellipsisMask){const a=Math.min(t.dims-(e.dims-r)+1+e.numAddAxisAfterEllipsis,t.dims);for(;n<a;n++)t.begin[n]=0,t.end[n]=0,t.strides[n]=1,t.beginMask|=1<<n,t.endMask|=1<<n,t.finalShapeGatherIndices.push(n),t.finalShapeGatherIndicesSparse.push(-1),t.inputShapeGatherIndicesSparse[n]=r}else if(1<<r&e.newAxisMask)t.finalShapeGatherIndices.push(-2),t.finalShapeGatherIndicesSparse.push(-1);else{if(n===t.begin.length)throw Error(`Index out of range using input dim ${n}; input has only ${t.dims} dims, ${t.begin.length}.`);null!=e.begin&&(t.begin[n]=e.begin[r]),null!=e.end&&(t.end[n]=e.end[r]),t.strides[n]=e.strides[r],e.beginMask&1<<r&&(t.beginMask|=1<<n),e.endMask&1<<r&&(t.endMask|=1<<n),e.shrinkAxisMask&1<<r?(t.finalShapeGatherIndices.push(-1),t.finalShapeGatherIndicesSparse.push(-1),t.shrinkAxisMask|=1<<n):(t.finalShapeGatherIndices.push(n),t.finalShapeGatherIndicesSparse.push(r)),t.inputShapeGatherIndicesSparse[n]=r,n++}}(p,d);let h=!0,m=!0,f=!0;const g=[],y=[];for(let b=0;b<e.length;++b){if(0===d.strides[b])throw Error(`strides[${b}] must be non-zero`);const t=!!(d.shrinkAxisMask&1<<b),n=e[b];if(-1===n){g.push(t?1:-1);continue}const r=[d.beginMask&1<<b,d.endMask&1<<b],a=[d.strides[b]>0?0:-1,d.strides[b]>0?n:n-1];if(t&&d.strides[b]<=0)throw Error("only stride 1 allowed on non-range indexing.");f=f&&1===d.strides[b];const s=!!(d.beginMask&1<<b&&d.endMask&1<<b);if(d.beginValid&&d.endValid){if(t){const e=d.begin[b]<0?n+d.begin[b]:d.begin[b];if(d.begin[b]=e,d.end[b]=d.begin[b]+1,e<0||e>=n)throw Error(`slice index ${d.begin[b]} of dimension ${b} out of bounds.`)}else d.begin[b]=Wh(d.begin[b],0,d.strides[b],n,r,a),d.end[b]=Wh(d.end[b],1,d.strides[b],n,r,a);const e=1===d.strides[b]&&0===d.begin[b]&&d.end[b]===n;h=h&&e,m=m&&(0===b&&1===d.strides[b]||e)}else h=h&&1===d.strides[b]&&s,m=m&&(0===b&&1===d.strides[b]||s);let o,i=!1;if(d.beginValid&&d.endValid?(o=d.end[b]-d.begin[b],i=!0):t?(o=1,i=!0):s&&n>=0&&(o=d.strides[b]<0?-n:n,i=!0),i){let e;e=0===o||o<0!=d.strides[b]<0?0:Math.trunc(o/d.strides[b])+(o%d.strides[b]!==0?1:0),g.push(e)}else g.push(-1)}for(let b=0;b<d.finalShapeGatherIndices.length;++b){const e=d.finalShapeGatherIndices[b];e>=0?y.push(g[e]):-2===e&&y.push(1)}return{finalShapeSparse:y.filter((e,t)=>-2!==d.finalShapeGatherIndices[t]),finalShape:y,isIdentity:h,sliceDim0:m,isSimpleSlice:f,begin:d.begin,end:d.end,strides:d.strides}}function Wh(e,t,n,r,a,s){if(a[t])return n>0?s[t]:s[t+1&1];{const t=e<0?r+e:e;return t<s[0]?s[0]:t>s[1]?s[1]:t}}const Gh=Object.freeze(Object.defineProperty({__proto__:null,assertParamsValid:Mh,computeFlatOffset:Vh,computeOutShape:$h,getNormalizedAxes:function(e,t,n,r,a,s,o,i,u){const l=e.length;let c=new Array(l),p=new Array(l),d=new Array(l);if(t.length&&n>0){const u=t[0],l=n+1;c=Ch(o,u,l,r,e),p=Fh(i,u,l,a,e),d=Oh(s,u,l,e)}else for(let h=0;h<l;h++)c[h]=zh(o,r,s,e,h,u),p[h]=Lh(i,a,s,e,h,u),d[h]=Bh(s,h,u);return{begin:c,end:p,strides:d}},isSliceContinous:Ph,maskToAxes:function(e){const t=[];let n=0;for(;e>0;)1&e&&t.push(n),e/=2,n++;return t},parseSliceParams:Uh,sliceInfo:jh,startForAxis:zh,startIndicesWithElidedDims:Ch,stopForAxis:Lh,stopIndicesWithElidedDims:Fh,stridesForAxis:Bh,stridesWithElidedDims:Oh},Symbol.toStringTag,{value:"Module"})),qh="4.22.0";
/** @license See the LICENSE file. */
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
class Kh{static sgd(e){return new Yd(e)}static momentum(e,t,n=!1){return new Qd(e,t,n)}static rmsprop(e,t=.9,n=0,r=null,a=!1){return new eh(e,t,n,r,a)}static adam(e=.001,t=.9,n=.999,r=null){return new Jd(e,t,n,r)}static adadelta(e=.001,t=.95,n=null){return new Hd(e,t,n)}static adamax(e=.002,t=.9,n=.999,r=null,a=0){return new Xd(e,t,n,r,a)}static adagrad(e,t=.1){return new Zd(e,t)}}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Hh=Kh,Zh="undefined"!=typeof requestAnimationFrame?requestAnimationFrame:"undefined"!=typeof setImmediate?setImmediate:e=>e();
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Jh(){return new Promise(e=>Zh(()=>e()))}
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Xh(e,t){const n=e[0].length;e.forEach((e,t)=>{p(e.length===n,()=>`Error in concat${n}D: rank of tensors[${t}] must be the same as the rank of the rest (${n})`)}),p(t>=0&&t<n,()=>`Error in concat${n}D: axis must be between 0 and ${n-1}.`);const r=e[0];e.forEach((e,a)=>{for(let s=0;s<n;s++)p(s===t||e[s]===r[s],()=>`Error in concat${n}D: Shape of tensors[${a}] (${e}) does not match the shape of the rest (${r}) along the non-concatenated axis ${a}.`)})}function Yh(e,t){const n=e[0].slice();for(let r=1;r<e.length;r++)n[t]+=e[r][t];return n}
/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */var Qh,em;function tm(e,t,n){let r=new Array;if(null==n&&null==t)return r;if(null==t)for(;r.length<e+n.length;)r.push(-1);else r=t.slice();if(null==n)return r;if(e+n.length!==r.length)throw new Error(`rt input.shape and shape=${t} are incompatible: rt input.rank = ${e+n.length}, but shape.rank = ${r.length}`);for(let a=1;a<n.length;++a){const s=n[a],o=r[r.length-n.length+a],i=r[o];if(s>=0)if(i>=0){if(i!==s)throw new Error(`rt input.shape and shape=${t} are incompatible: rt input.shape[${a+e}] = ${s} but shape[${a+e}] = ${i}`)}else r[o]=s}return r}function nm(e){const t={FIRST_DIM_SIZE:Qh.FIRST_DIM_SIZE,VALUE_ROWIDS:Qh.VALUE_ROWIDS,ROW_LENGTHS:Qh.ROW_LENGTHS,ROW_SPLITS:Qh.ROW_SPLITS,ROW_LIMITS:Qh.ROW_LIMITS,ROW_STARTS:Qh.ROW_STARTS},n=[];for(const r of e){if(!(r in t))break;n.push(t[r])}return n}function rm(e){return 0===e.length?0:e[0]===Qh.FIRST_DIM_SIZE?e.length-1:e.length}function am(e,t){if(null==e||null==t)return;const n=e.length,r=t.length;if(n>=r)throw new Error(`defaultValue.shape=${e} and ragged tensor flatValues.shape=${t}, are incompatible: defaultValue.rank = ${n} must be less than ragged tensor input flatValues.rank = ${r})`);for(let a=0;a<Math.min(n,r-1);++a){const n=e[a],r=t[a+1];if(n>=0&&r>=0&&1!==n&&n!==r)throw new Error(`defaultValue.shape=${e}, and ragged tensor input flatValues.shape=${t} are incompatible: defaultValue.shape[${a-e.length}] = ${n} but ragged tensor input.flatValues.shape[${a-e.length}] = ${r}`)}}
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */(em=Qh||(Qh={}))[em.FIRST_DIM_SIZE=0]="FIRST_DIM_SIZE",em[em.VALUE_ROWIDS=1]="VALUE_ROWIDS",em[em.ROW_LENGTHS=2]="ROW_LENGTHS",em[em.ROW_SPLITS=3]="ROW_SPLITS",em[em.ROW_LIMITS=4]="ROW_LIMITS",em[em.ROW_STARTS=5]="ROW_STARTS";function sm(e){return e<=30?e:F(e,Math.floor(Math.sqrt(e)))}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function om(e,t,n){return[n*("number"==typeof e?e:e[0]),t*("number"==typeof e?e:e[1])]}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function im(e,t,n,r=!0){let a=[];if(r)a=a.concat(t.slice(0)),a.push(e[0]/n),a=a.concat(e.slice(1));else{a=a.concat(e[0]);const n=t.length;for(let r=0;r<n;++r)a=a.concat([e[r+1]/t[r],t[r]]);a=a.concat(e.slice(n+1))}return a}function um(e,t,n=!0){const r=[];if(n){r.push(t);for(let n=t+1;n<e;++n)n<=2*t?(r.push(n),r.push(n-(t+1))):r.push(n)}else{const n=[],a=[];for(let r=1;r<e;++r)r>=2*t+1||r%2==1?a.push(r):n.push(r);r.push(...n),r.push(0),r.push(...a)}return r}function lm(e,t,n,r=!0){const a=[];r?a.push(e[0]/n):a.push(e[0]*n);for(let s=1;s<e.length;++s)s<=t.length?r?a.push(t[s-1]*e[s]):a.push(e[s]/t[s-1]):a.push(e[s]);return a}function cm(e,t){const n=[0];for(let r=0;r<t;++r)n.push(e[r][0]);return n}function pm(e,t,n){const r=e.slice(0,1);for(let a=0;a<n;++a)r.push(e[a+1]-t[a][0]-t[a][1]);return r}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const dm=1.7580993408473768,hm=1.0507009873554805,mm=.3275911,fm=.254829592,gm=-.284496736,ym=1.421413741,bm=-1.453152027,wm=1.061405429;
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function xm(e,t){if(e.length!==t.length)throw new Error(`Cannot merge real and imag arrays of different lengths. real:${e.length}, imag: ${t.length}.`);const n=new Float32Array(2*e.length);for(let r=0;r<n.length;r+=2)n[r]=e[r/2],n[r+1]=t[r/2];return n}function Nm(e){const t=new Float32Array(e.length/2),n=new Float32Array(e.length/2);for(let r=0;r<e.length;r+=2)t[r/2]=e[r],n[r/2]=e[r+1];return{real:t,imag:n}}function Sm(e){const t=Math.ceil(e.length/4),n=new Float32Array(t),r=new Float32Array(t);for(let a=0;a<e.length;a+=4)n[Math.floor(a/4)]=e[a],r[Math.floor(a/4)]=e[a+1];return{real:n,imag:r}}function vm(e){const t=Math.floor(e.length/4),n=new Float32Array(t),r=new Float32Array(t);for(let a=2;a<e.length;a+=4)n[Math.floor(a/4)]=e[a],r[Math.floor(a/4)]=e[a+1];return{real:n,imag:r}}function Tm(e,t){return{real:e[2*t],imag:e[2*t+1]}}function km(e,t,n,r){e[2*r]=t,e[2*r+1]=n}function Em(e,t){const n=new Float32Array(e/2),r=new Float32Array(e/2);for(let a=0;a<Math.ceil(e/2);a++){const s=(t?2:-2)*Math.PI*(a/e);n[a]=Math.cos(s),r[a]=Math.sin(s)}return{real:n,imag:r}}function _m(e,t,n){const r=(n?2:-2)*Math.PI*(e/t);return{real:Math.cos(r),imag:Math.sin(r)}}
/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Im="->",Am=/->/g;function Mm(e,t){const n=((e=e.replace(/\s/g,"")).length-e.replace(Am,"").length)/2;if(n<1)throw new Error("Equations without an arrow are not supported.");if(n>1)throw new Error(`Equation must contain exactly one arrow ("${Im}").`);const[r,a]=e.split(Im);p(-1===r.indexOf("..."),()=>'The ellipsis notation ("...") is not supported yet.');const s=r.split(","),o=s.length;if(t!==o)throw new Error(`Expected ${o} input tensors, received ${t}`);if(o>2)throw new Error("Support for more than 2 input tensors is not implemented yet.");const i=[];for(let p=0;p<a.length;++p){const e=a[p];if(!s.some(t=>-1!==t.indexOf(e)))throw new Error(`Output subscripts contain the label ${e} not present in the input subscripts.`);-1===i.indexOf(e)&&i.push(e)}for(let p=0;p<r.length;++p){const e=r[p];-1===i.indexOf(e)&&","!==e&&i.push(e)}const u=new Array(s.length);for(let p=0;p<o;++p){if(new Set(s[p].split("")).size!==s[p].length)throw new Error(`Found duplicate axes in input component ${s[p]}. Support for duplicate axes in input is not implemented yet.`);u[p]=[];for(let e=0;e<s[p].length;++e)u[p].push(i.indexOf(s[p][e]))}const l=i.length,c=[];for(let p=a.length;p<l;++p)c.push(p);return{allDims:i,summedDims:c,idDims:u}}function $m(e,t){let n=new Array(e);n.fill(-1);for(let a=0;a<t.length;++a)n[t[a]]=a;const r=[];for(let a=0;a<e;++a)-1===n[a]&&r.push(a);return n=n.filter(e=>-1!==e),{permutationIndices:n,expandDims:r}}function Om(e,t,n){const r=new Array(e);for(let a=0;a<n.length;++a){const e=n[a].shape;for(let n=0;n<t[a].length;++n)void 0===r[t[a][n]]?r[t[a][n]]=e[n]:p(r[t[a][n]]===e[n],()=>`Expected dimension ${r[t[a][n]]} at axis ${n} of input shaped ${JSON.stringify(e)}, but got dimension ${e[n]}`)}}function Dm(e,t){const n=e,r=[];let a=0;0===e.length&&n.push(-1),a=e.length+1;for(let o=0;o<a;++o)r.push([]);const s=[];for(let o=0;o<n.length;++o){const e=Cm(t,n[o]);for(const t of e)-1===s.indexOf(t)&&(r[o].push(t),s.push(t))}return{path:n,steps:r}}function Rm(e){return e.every((e,t)=>e===t)}function Cm(e,t){const n=[];for(let r=0;r<e.length;++r)0!==e[r].length&&-1===e[r].indexOf(t)&&-1!==t||n.push(r);return n}function Fm(e,t,n=0){let r=[];if("number"==typeof t)p(e.shape[n]%t===0,()=>"Number of splits must evenly divide the axis."),r=new Array(t).fill(e.shape[n]/t);else{p(t.reduce((e,t)=>(-1===t&&(e+=1),e),0)<=1,()=>"There should be only one negative value in split array.");const a=t.indexOf(-1);if(-1!==a){const r=t.reduce((e,t)=>t>0?e+t:e);t[a]=e.shape[n]-r}p(e.shape[n]===t.reduce((e,t)=>e+t),()=>"The sum of sizes must match the size of the axis dimension."),r=t}return r}
/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Bm(e){return`Received SparseTensor with denseShape[0] = 0 but\n  indices.shape[0] = ${e}`}function zm(e,t){return`indices(${e}, 0) is invalid: ${t} < 0`}function Lm(e,t,n){return`indices(${e}, 0) is invalid: ${t} >= ${n}`}
/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Pm(e,t){return`only one output dimension may be -1, not both ${e} and ${t}`}function Vm(e,t){return`size ${e} must be non-negative, not ${t}`}function Um(){return"reshape cannot infer the missing input size for an empty tensor unless all specified input sizes are non-zero"}function jm(e,t){return`Input to reshape is a SparseTensor with ${m(e)}\n  dense values, but the requested shape requires a multiple of ${m(t)}. inputShape=${e} outputShape= ${t}`}function Wm(e,t){return`Input to reshape is a tensor with ${m(e)} dense values, but the requested shape has ${m(t)}. inputShape=${e} outputShape=${t}`}
/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Gm(){return"segment ids must be >= 0"}function qm(){return"segment ids are not increasing"}function Km(e,t){return`Segment id ${e} out of range [0, ${t}), possibly because segmentIds input is not sorted.`}function Hm(e,t,n){return`Bad: indices[${e}] == ${t} out of range [0, ${n})`}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Zm(e,t){let n,r=!1;for(e<=30?(n=e,r=!0):n=F(e,Math.floor(Math.sqrt(e)));!r;)n>t||n===e?r=!0:n=F(e,n+1);return n}function Jm(e,t,n){const r=[],a=e.length;for(let s=0;s<a;s++)s!==t?r.push(e[s]):r.push(n);return r}function Xm(e,t,n,r){const a=t.shape.length,s=e.shape.length;if(0!==r&&(r<-a||r>a))throw new Error(`Expect batchDims in the range of [-${a}, ${a}], but got ${r}`);if(r<0&&(r+=a),r>s)throw new Error(`batchDims (${r}) must be less than rank(x) (\n    ${s}).`);if(n<r)throw new Error(`batchDims (${r}) must be less than or equal to axis (${n}).`);for(let p=0;p<r;++p)if(e.shape[p]!==t.shape[p])throw new Error(`x.shape[${p}]: ${e.shape[p]} should be equal to indices.shape[${p}]: ${t.shape[p]}.`);const o=e.shape[n],i=[];let u=1,l=1,c=1;for(let p=0;p<r;++p)i.push(e.shape[p]),u*=e.shape[p];for(let p=r;p<n;p++)i.push(e.shape[p]),l*=e.shape[p];for(let p=r;p<a;p++)i.push(t.shape[p]);for(let p=n+1;p<s;p++)i.push(e.shape[p]),c*=e.shape[p];return{batchSize:u,sliceSize:c,outerSize:l,dimSize:o,outputShape:i}}const Ym=Object.freeze(Object.defineProperty({__proto__:null,collectGatherOpShapeInfo:Xm,computeOutShape:Jm,segOpComputeOptimalWindowSize:Zm},Symbol.toStringTag,{value:"Module"}));
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Qm(e){try{return e.map(e=>na(e))}catch(Og){throw new Error(`Failed to decode encoded string bytes into utf-8, error: ${Og}`)}}function ef(e){return e.map(e=>ta(e))}const tf=Object.freeze(Object.defineProperty({__proto__:null,ERF_A1:fm,ERF_A2:gm,ERF_A3:ym,ERF_A4:bm,ERF_A5:wm,ERF_P:mm,PARALLELIZE_THRESHOLD:30,get RowPartitionType(){return Qh},SELU_SCALE:hm,SELU_SCALEALPHA:dm,applyActivation:Fp,assertAndGetBroadcastShape:Yi,assertAxesAreInnerMostDims:hu,assertParamsConsistent:Xh,assignToTypedArray:km,axesAreInnerMostDims:lu,calculateShapes:pp,checkEinsumDimSizes:Om,checkPadOnDimRoundingMode:ui,combineLocations:cu,combineRaggedTensorToTensorShapes:tm,complexWithEvenIndex:Sm,complexWithOddIndex:vm,computeConv2DInfo:Xo,computeConv3DInfo:Yo,computeDefaultPad:Qo,computeDilation2DInfo:Ho,computeOptimalWindowSize:sm,computeOutAndReduceShapes:pu,computeOutShape:Yh,computePool2DInfo:Zo,computePool3DInfo:Jo,convertConv2DDataFormat:ii,decodeEinsumEquation:Mm,eitherStridesOrDilationsAreOne:si,expandShapeToKeepDim:du,exponent:_m,exponents:Em,fromStringArrayToUint8:ef,fromUint8ToStringArray:Qm,getAxesPermutation:mu,getBroadcastDims:Ji,getComplexWithIndex:Tm,getEinsumComputePath:Dm,getEinsumPermutation:$m,getFusedBiasGradient:Cp,getFusedDyActivation:Rp,getImageCenter:om,getInnerMostAxes:gu,getPermuted:um,getRaggedRank:rm,getReductionAxes:Xi,getReshaped:im,getReshapedPermuted:lm,getRowPartitionTypesHelper:nm,getSliceBeginCoords:cm,getSliceSize:pm,getSparseFillEmptyRowsIndicesDenseShapeMismatch:Bm,getSparseFillEmptyRowsNegativeIndexErrorMessage:zm,getSparseFillEmptyRowsOutOfRangeIndexErrorMessage:Lm,getSparseReshapeEmptyTensorZeroOutputDimErrorMessage:Um,getSparseReshapeInputOutputMismatchErrorMessage:Wm,getSparseReshapeInputOutputMultipleErrorMessage:jm,getSparseReshapeMultipleNegativeOneOutputDimErrorMessage:Pm,getSparseReshapeNegativeOutputDimErrorMessage:Vm,getSparseSegmentReductionIndicesOutOfRangeErrorMessage:Hm,getSparseSegmentReductionNegativeSegmentIdsErrorMessage:Gm,getSparseSegmentReductionNonIncreasingSegmentIdsErrorMessage:qm,getSparseSegmentReductionSegmentIdOutOfRangeErrorMessage:Km,getUndoAxesPermutation:fu,isIdentityPermutation:Rm,log:function(...e){!X().getBool("IS_TEST")&&X().getBool("PROD")},mergeRealAndImagArrays:xm,prepareAndValidate:Ih,prepareSplitSize:Fm,segment_util:Ym,shouldFuse:Bp,slice_util:Gh,splitRealAndImagArrays:Nm,stridesOrDilationsArePositive:oi,tupleValuesAreOne:ai,upcastType:$a,validateDefaultValueShape:am,validateInput:cp,validateUpdateShape:lp,warn:Nr},Symbol.toStringTag,{value:"Module"})),nf=Object.freeze(Object.defineProperty({__proto__:null,nonMaxSuppressionV3Impl:rd,nonMaxSuppressionV4Impl:ad,nonMaxSuppressionV5Impl:sd,whereImpl:Np},Symbol.toStringTag,{value:"Module"}));
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
!function(){for(const e of th)Gd(e)}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */();const rf=Object.freeze(Object.defineProperty({__proto__:null,Abs:ne,Acos:re,Acosh:ae,AdadeltaOptimizer:Hd,AdagradOptimizer:Zd,AdamOptimizer:Jd,AdamaxOptimizer:Xd,Add:se,AddN:oe,All:ie,Any:ue,ArgMax:le,ArgMin:ce,Asin:pe,Asinh:de,Atan:he,Atan2:fe,Atanh:me,AvgPool:ge,AvgPool3D:be,AvgPool3DGrad:we,AvgPoolGrad:ye,BatchMatMul:xe,BatchToSpaceND:Ne,Bincount:Se,BitwiseAnd:ve,BroadcastArgs:ke,BroadcastTo:Te,Cast:Ee,Ceil:_e,ClipByValue:Ie,Complex:Ae,ComplexAbs:Me,Concat:$e,Conv2D:Oe,Conv2DBackpropFilter:De,Conv2DBackpropInput:Re,Conv3D:Ce,Conv3DBackpropFilterV2:Fe,Conv3DBackpropInputV2:Be,Cos:ze,Cosh:Le,CropAndResize:Ue,Cumprod:Pe,Cumsum:Ve,DataStorage:r,DenseBincount:je,DepthToSpace:We,DepthwiseConv2dNative:Ge,DepthwiseConv2dNativeBackpropFilter:qe,DepthwiseConv2dNativeBackpropInput:Ke,Diag:He,Dilation2D:Ze,Dilation2DBackpropFilter:Xe,Dilation2DBackpropInput:Je,Draw:Ye,get ENV(){return Q},Einsum:et,Elu:tt,EluGrad:nt,Environment:Z,Equal:at,Erf:rt,Exp:st,ExpandDims:ot,Expm1:it,FFT:ut,Fill:lt,FlipLeftRight:ct,Floor:pt,FloorDiv:dt,FromPixels:gr,FusedBatchNorm:ht,FusedConv2D:wr,FusedDepthwiseConv2D:xr,GatherNd:ft,GatherV2:mt,Greater:gt,GreaterEqual:yt,IFFT:wt,Identity:bt,Imag:xt,IsFinite:Nt,IsInf:St,IsNan:vt,KernelBackend:a,LRN:Ft,LRNGrad:Bt,LeakyRelu:Tt,Less:kt,LessEqual:Et,LinSpace:_t,Log:It,Log1p:At,LogSoftmax:Rt,LogicalAnd:Mt,LogicalNot:$t,LogicalOr:Ot,LogicalXor:Dt,LowerBound:Ct,MatrixBandPart:zt,Max:Lt,MaxPool:Vt,MaxPool3D:jt,MaxPool3DGrad:Wt,MaxPoolGrad:Ut,MaxPoolWithArgmax:Gt,Maximum:Pt,Mean:qt,Min:Kt,Minimum:Ht,MirrorPad:Zt,Mod:Jt,MomentumOptimizer:Qd,Multinomial:Xt,Multiply:Yt,Neg:Qt,NonMaxSuppressionV3:tn,NonMaxSuppressionV4:nn,NonMaxSuppressionV5:rn,NotEqual:en,OP_SCOPE_SUFFIX:rs,OneHot:sn,OnesLike:an,Optimizer:Kd,OptimizerConstructors:Kh,Pack:on,PadV2:un,Pool:ln,Pow:cn,Prelu:pn,Prod:dn,RMSPropOptimizer:eh,RaggedGather:hn,RaggedRange:mn,RaggedTensorToTensor:fn,Range:gn,get Rank(){return xa},Real:yn,RealDiv:Qe,Reciprocal:bn,get Reduction(){return vd},Relu:wn,Relu6:kn,Reshape:xn,ResizeBilinear:vn,ResizeBilinearGrad:Tn,ResizeNearestNeighbor:Nn,ResizeNearestNeighborGrad:Sn,Reverse:En,RotateWithOffset:yr,Round:_n,Rsqrt:In,SGDOptimizer:Yd,ScatterNd:An,SearchSorted:$n,Select:On,Selu:Dn,Sigmoid:zn,Sign:Bn,Sin:Cn,Sinh:Fn,Slice:Rn,Softmax:Wn,Softplus:Ln,SpaceToBatchND:Un,SparseFillEmptyRows:Gn,SparseReshape:qn,SparseSegmentMean:Kn,SparseSegmentSum:Hn,SparseToDense:Zn,SplitV:jn,Sqrt:Pn,Square:Xn,SquaredDifference:Jn,StaticRegexReplace:Yn,Step:fr,StridedSlice:Qn,StringNGrams:er,StringSplit:tr,StringToHashBucketFast:nr,Sub:rr,Sum:Vn,Tan:ar,Tanh:sr,Tensor:ya,TensorBuffer:ma,TensorScatterUpdate:Mn,Tile:or,TopK:ir,Transform:ur,Transpose:lr,Unique:cr,Unpack:pr,UnsortedSegmentSum:dr,UpperBound:hr,Variable:wa,ZerosLike:mr,_FusedMatMul:br,abs:Co,acos:Fo,acosh:Bo,add:$o,addN:zo,all:Lo,any:Po,argMax:Vo,argMin:Uo,asin:jo,asinh:Wo,atan:Go,atan2:qo,atanh:Ko,avgPool:ci,avgPool3d:pi,backend:As,backend_util:tf,basicLSTMCell:yi,batchNorm:wi,batchNorm2d:xi,batchNorm3d:Ni,batchNorm4d:Si,batchToSpaceND:bi,bincount:vi,bitwiseAnd:Ti,booleanMaskAsync:vp,broadcastArgs:ki,broadcastTo:Ei,broadcast_util:Qi,browser:_h,buffer:_o,cast:Io,ceil:_i,clipByValue:Ai,clone:Ao,complex:ss,concat:di,concat1d:Mi,concat2d:$i,concat3d:Oi,concat4d:Di,conv1d:Ci,conv2d:Ri,conv2dTranspose:Bi,conv3d:zi,conv3dTranspose:Pi,copyRegisteredKernels:$r,cos:Vi,cosh:Ui,cosineWindow:$p,cumprod:ji,cumsum:Wi,customGrad:Yu,denseBincount:Gi,deprecationWarn:hs,depthToSpace:qi,depthwiseConv2d:Ki,device_util:Ja,diag:Hi,dilation2d:Zi,disableDeprecationWarnings:ds,dispose:ws,disposeVariables:ms,div:Do,divNoNan:ru,dot:au,dropout:Ap,einsum:su,elu:ou,enableDebugMode:ps,enableProdMode:cs,enclosingPowerOfTwo:Mp,engine:fs,ensureShape:iu,env:X,equal:eu,erf:uu,euclideanNorm:Eu,exp:_u,expandDims:Iu,expm1:Au,eye:$u,fft:qc,fill:Ii,findBackend:Es,findBackendFactory:_s,floor:Ou,floorDiv:Oo,fused:jp,gather:Du,gatherND:Ip,gather_util:Ah,getBackend:Ts,getGradient:kr,getKernel:Tr,getKernelsForBackend:Er,grad:Ku,grads:Hu,greater:Ru,greaterEqual:Cu,ifft:Kc,imag:Fu,image:Fd,inTopKAsync:Op,io:bh,irfft:Hc,isFinite:Bu,isInf:zu,isNaN:Lu,keep:xs,kernel_impls:nf,leakyRelu:Pu,less:Vu,lessEqual:Uu,linalg:Bd,linspace:ju,localResponseNormalization:Wu,log:Gu,log1p:qu,logSigmoid:nl,logSoftmax:al,logSumExp:sl,logicalAnd:ol,logicalNot:il,logicalOr:ul,logicalXor:ll,losses:zd,lowerBound:dl,matMul:hi,math:xh,max:yu,maxPool:hl,maxPool3d:ml,maxPoolWithArgmax:fl,maximum:gl,mean:yl,memory:gs,meshgrid:xl,min:bu,minimum:Nl,mirrorPad:Sl,mod:vl,moments:Tl,movingAverage:kp,mul:Ro,multiRNNCell:kl,multinomial:El,neg:el,nextFrame:Jh,norm:ku,notEqual:_l,oneHot:Il,ones:wl,onesLike:Al,op:as,outerProduct:Ml,pad:$l,pad1d:Ol,pad2d:Dl,pad3d:Rl,pad4d:Cl,pool:Bl,pow:wu,prelu:zl,print:Mo,prod:Ll,profile:ys,raggedGather:Pl,raggedRange:Vl,raggedTensorToTensor:Ul,rand:jl,randomGamma:bc,randomNormal:wc,randomStandardNormal:xc,randomUniform:Nc,randomUniformInt:Sc,range:vc,ready:vs,real:Tc,reciprocal:kc,registerBackend:Is,registerGradient:Ir,registerKernel:_r,relu:Ec,relu6:_c,removeBackend:ks,reshape:li,reverse:Ic,reverse1d:Ac,reverse2d:Mc,reverse3d:$c,reverse4d:Oc,rfft:Jc,round:Dc,rsqrt:Rc,scalar:xu,scatterND:Ep,scatter_util:dp,searchSorted:pl,selu:Cc,separableConv2d:Fc,serialization:qd,setBackend:Ss,setPlatform:Ms,setdiff1dAsync:Bc,sigmoid:mi,sign:zc,signal:Cd,sin:Lc,sinh:Pc,slice:fi,slice1d:Vc,slice2d:Uc,slice3d:jc,slice4d:Wc,slice_util:Gh,softmax:Gc,softplus:tl,spaceToBatchND:Fl,sparse:Ld,sparseToDense:_p,spectral:Rd,split:Zc,sqrt:Nu,square:Su,squaredDifference:Xc,squeeze:Yc,stack:Qc,step:ep,stridedSlice:tp,string:Pd,sub:rl,sum:vu,sumOutType:Oa,tan:np,tanh:gi,tensor:is,tensor1d:rp,tensor2d:ap,tensor3d:sp,tensor4d:op,tensor5d:ip,tensor6d:up,tensorScatterUpdate:hp,tensor_util:Pa,test_util:mc,tidy:bs,tile:Mu,time:Ns,topk:mp,train:Hh,transpose:Tp,truncatedNormal:fp,unique:gp,unregisterGradient:Mr,unregisterKernel:Ar,unsortedSegmentSum:yp,unstack:bp,upcastType:$a,upperBound:wp,util:sa,valueAndGrad:Zu,valueAndGrads:Ju,variable:xp,variableGrads:Xu,version_core:qh,where:tu,whereAsync:Sp,zeros:bl,zerosLike:nu},Symbol.toStringTag,{value:"Module"}));
/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * =============================================================================
 */
var af,sf,of,uf,lf;X().registerFlag("KEEP_INTERMEDIATE_TENSORS",()=>!1,e=>{}),(sf=af||(af={}))[sf.DT_INVALID=0]="DT_INVALID",sf[sf.DT_FLOAT=1]="DT_FLOAT",sf[sf.DT_DOUBLE=2]="DT_DOUBLE",sf[sf.DT_INT32=3]="DT_INT32",sf[sf.DT_UINT8=4]="DT_UINT8",sf[sf.DT_INT16=5]="DT_INT16",sf[sf.DT_INT8=6]="DT_INT8",sf[sf.DT_STRING=7]="DT_STRING",sf[sf.DT_COMPLEX64=8]="DT_COMPLEX64",sf[sf.DT_INT64=9]="DT_INT64",sf[sf.DT_BOOL=10]="DT_BOOL",sf[sf.DT_QINT8=11]="DT_QINT8",sf[sf.DT_QUINT8=12]="DT_QUINT8",sf[sf.DT_QINT32=13]="DT_QINT32",sf[sf.DT_BFLOAT16=14]="DT_BFLOAT16",sf[sf.DT_QINT16=15]="DT_QINT16",sf[sf.DT_QUINT16=16]="DT_QUINT16",sf[sf.DT_UINT16=17]="DT_UINT16",sf[sf.DT_COMPLEX128=18]="DT_COMPLEX128",sf[sf.DT_HALF=19]="DT_HALF",sf[sf.DT_RESOURCE=20]="DT_RESOURCE",sf[sf.DT_VARIANT=21]="DT_VARIANT",sf[sf.DT_UINT32=22]="DT_UINT32",sf[sf.DT_UINT64=23]="DT_UINT64",sf[sf.DT_FLOAT_REF=101]="DT_FLOAT_REF",sf[sf.DT_DOUBLE_REF=102]="DT_DOUBLE_REF",sf[sf.DT_INT32_REF=103]="DT_INT32_REF",sf[sf.DT_UINT8_REF=104]="DT_UINT8_REF",sf[sf.DT_INT16_REF=105]="DT_INT16_REF",sf[sf.DT_INT8_REF=106]="DT_INT8_REF",sf[sf.DT_STRING_REF=107]="DT_STRING_REF",sf[sf.DT_COMPLEX64_REF=108]="DT_COMPLEX64_REF",sf[sf.DT_INT64_REF=109]="DT_INT64_REF",sf[sf.DT_BOOL_REF=110]="DT_BOOL_REF",sf[sf.DT_QINT8_REF=111]="DT_QINT8_REF",sf[sf.DT_QUINT8_REF=112]="DT_QUINT8_REF",sf[sf.DT_QINT32_REF=113]="DT_QINT32_REF",sf[sf.DT_BFLOAT16_REF=114]="DT_BFLOAT16_REF",sf[sf.DT_QINT16_REF=115]="DT_QINT16_REF",sf[sf.DT_QUINT16_REF=116]="DT_QUINT16_REF",sf[sf.DT_UINT16_REF=117]="DT_UINT16_REF",sf[sf.DT_COMPLEX128_REF=118]="DT_COMPLEX128_REF",sf[sf.DT_HALF_REF=119]="DT_HALF_REF",sf[sf.DT_RESOURCE_REF=120]="DT_RESOURCE_REF",sf[sf.DT_VARIANT_REF=121]="DT_VARIANT_REF",sf[sf.DT_UINT32_REF=122]="DT_UINT32_REF",sf[sf.DT_UINT64_REF=123]="DT_UINT64_REF",uf=of||(of={}),(lf=uf.CheckpointFormatVersion||(uf.CheckpointFormatVersion={}))[lf.LEGACY=0]="LEGACY",lf[lf.V1=1]="V1",lf[lf.V2=2]="V2";
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
const cf={};function pf(e,t){const n={tfOpName:e,category:"custom",inputs:[],attrs:[],customExecutor:t};cf[e]=n}function df(e){return cf[e]}function hf(e){delete cf[e]}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function mf(e,t,n,r,a){const s=t.inputParams[e];if(s&&void 0!==s.inputIndexStart){const e=s.inputIndexStart,o=0===s.inputIndexEnd?void 0:void 0===s.inputIndexEnd?e+1:s.inputIndexEnd,i=e<0?t.inputNames.length+e:e;if("tensor"===s.type)return ff(t.inputNames[i],n,r,a);if("tensors"===s.type){const s=t.inputs.slice(e,o);return t.inputNames.slice(e,o).filter((e,t)=>{var n;return"NoOp"!==(null===(n=s[t])||void 0===n?void 0:n.op)}).map(e=>ff(e,n,r,a))}const u=ff(t.inputNames[i],n,r,a),l=u.dataSync();return"number"===s.type?l[0]:L(u.shape,l)}const o=t.attrParams[e];return o&&o.value}function ff(e,t,n,r){const[a,s]=wf(e,n);if(null!=r){const e=r.getHashTableHandleByName(a);if(null!=e)return e}const o=n.currentContextIds.find(e=>!!t[bf(a,e)]);return void 0!==o?t[bf(a,o)][s]:void 0}function gf(e,t,n){return t[bf(e,n.currentContextId)]}function yf(e,t){const[n,r,a]=wf(e,t);return[bf(n,t&&t.currentContextId),r,a]}function bf(e,t){return t?`${e}-${t}`:e}function wf(e,t){if(""===e)return["",0,void 0];const n=null!=t&&null!=t.parseNodeNameCache;if(n){const n=t.parseNodeNameCache.get(e);if(null!=n)return n}const r=e.split(":");let a;if(1===r.length)a=[e,0,void 0];else{const e=r[0],t=3===r.length?r[1]:void 0;a=[e,Number(r[r.length-1]),t]}return n&&t.parseNodeNameCache.set(e,a),a}function xf(e,t,n){let r=mf("pad",e,t,n);if("explicit"===r){r=mf("explicitPaddings",e,t,n);const a=[[0,0],[0,0],[0,0],[0,0]];for(let e=0;e<4;e++)a[e][0]=r[2*e],a[e][1]=r[2*e+1];return a}return r}function Nf(e){return e.kept?e:Ao(e)}
/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Sf=Object.freeze(Object.defineProperty({__proto__:null,json:[{tfOpName:"Add",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"AddV2",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"AddN",category:"arithmetic",inputs:[{start:0,end:0,name:"tensors",type:"tensors"}]},{tfOpName:"BiasAdd",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0}]},{tfOpName:"Sub",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"RealDiv",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Div",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"DivNoNan",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"FloorDiv",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Mul",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Maximum",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Minimum",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Pow",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"SquaredDifference",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Mod",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"FloorMod",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]}]},Symbol.toStringTag,{value:"Module"})),vf=Object.freeze(Object.defineProperty({__proto__:null,json:[{tfOpName:"Abs",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Acos",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Asin",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Atan",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Atan2",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"y",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Ceil",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"ClipByValue",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"clipValueMin",type:"number"},{start:2,name:"clipValueMax",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Complex",category:"basic_math",inputs:[{start:0,name:"real",type:"tensor"},{start:1,name:"imag",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"ComplexAbs",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Cos",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Cosh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Elu",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Exp",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Floor",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Log",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Imag",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"Tout",name:"outputType",type:"dtype",notSupported:!0}]},{tfOpName:"Neg",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Real",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"Tout",name:"outputType",type:"dtype",notSupported:!0}]},{tfOpName:"Prelu",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"alpha",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Relu",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Relu6",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Selu",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Sigmoid",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Sin",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Sinh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Sqrt",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Rsqrt",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Square",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Tan",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Tanh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Sign",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Round",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Expm1",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Log1p",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Reciprocal",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Softplus",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Asinh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Acosh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Atanh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Erf",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"LeakyRelu",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"alpha",name:"alpha",type:"number",defaultValue:.2},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"IsNan",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"IsFinite",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"IsInf",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]}]},Symbol.toStringTag,{value:"Module"})),Tf=Object.freeze(Object.defineProperty({__proto__:null,json:[{tfOpName:"EmptyTensorList",category:"control",inputs:[{start:0,name:"elementShape",type:"shape"},{start:1,name:"maxNumElements",type:"number"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"LoopCond",category:"control",inputs:[{start:0,name:"pred",type:"tensor"}]},{tfOpName:"Switch",category:"control",inputs:[{start:0,name:"data",type:"tensor"},{start:1,name:"pred",type:"tensor"}]},{tfOpName:"Merge",category:"control",inputs:[{start:0,end:0,name:"tensors",type:"tensors"}]},{tfOpName:"Enter",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"frame_name",name:"frameName",type:"string"},{tfName:"is_constant",name:"isConstant",type:"bool"}]},{tfOpName:"Exit",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"NextIteration",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"TensorArrayV3",category:"control",inputs:[{start:0,name:"size",type:"number"}],attrs:[{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"element_shape",name:"elementShape",type:"shape"},{tfName:"dynamic_size",name:"dynamicSize",type:"bool"},{tfName:"clear_after_read",name:"clearAfterRead",type:"bool"},{tfName:"identical_element_shapes",name:"identicalElementShapes",type:"bool"},{tfName:"tensor_array_name",name:"name",type:"string"}]},{tfOpName:"TensorArrayWriteV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"index",type:"number"},{start:2,name:"tensor",type:"tensor"},{start:3,name:"flowIn",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"TensorArrayReadV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"index",type:"number"},{start:2,name:"flowIn",type:"number"}],attrs:[{tfName:"dtype",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"TensorArrayGatherV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"indices",type:"number[]"},{start:2,name:"flowIn",type:"number"}],attrs:[{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"element_shape",name:"elementShape",type:"shape"}]},{tfOpName:"TensorArrayScatterV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"indices",type:"number[]"},{start:2,name:"tensor",type:"tensor"},{start:3,name:"flowIn",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"TensorArrayConcatV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"flowIn",type:"number"}],attrs:[{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"element_shape_except0",name:"elementShapeExcept0",type:"shape",notSupported:!0}]},{tfOpName:"TensorArraySplitV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"tensor",type:"tensor"},{start:2,name:"lengths",type:"number[]"},{start:3,name:"flowIn",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"TensorArraySizeV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"flowIn",type:"number"}]},{tfOpName:"TensorArrayCloseV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"}]},{tfOpName:"StatelessIf",category:"control",inputs:[{start:0,name:"cond",type:"tensor"},{start:1,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"then_branch",name:"thenBranch",type:"func"},{tfName:"else_branch",name:"elseBranch",type:"func"}]},{tfOpName:"If",category:"control",inputs:[{start:0,name:"cond",type:"tensor"},{start:1,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"then_branch",name:"thenBranch",type:"func"},{tfName:"else_branch",name:"elseBranch",type:"func"}]},{tfOpName:"StatelessWhile",category:"control",inputs:[{start:0,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"cond",name:"cond",type:"func"},{tfName:"body",name:"body",type:"func"}]},{tfOpName:"While",category:"control",inputs:[{start:0,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"cond",name:"cond",type:"func"},{tfName:"body",name:"body",type:"func"}]},{tfOpName:"TensorListScatter",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"},{start:1,name:"indices",type:"number[]"},{start:2,name:"elementShape",type:"shape"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListScatterV2",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"},{start:1,name:"indices",type:"number[]"},{start:2,name:"elementShape",type:"shape"},{start:3,name:"numElements",type:"number"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListGather",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"indices",type:"number[]"},{start:2,name:"elementShape",type:"shape"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListGetItem",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"index",type:"number"},{start:2,name:"elementShape",type:"shape"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListSetItem",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"index",type:"number"},{start:2,name:"tensor",type:"tensor"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListReserve",category:"control",inputs:[{start:0,name:"elementShape",type:"shape"},{start:1,name:"numElements",type:"number"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListFromTensor",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"},{start:1,name:"elementShape",type:"shape"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListStack",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"elementShape",type:"shape"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"},{tfName:"num_elements",name:"numElements",type:"dtype"}]},{tfOpName:"TensorListSplit",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"},{start:1,name:"elementShape",type:"shape"},{start:2,name:"lengths",type:"number[]"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListConcat",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"}],attrs:[{tfName:"element_shape",name:"elementShape",type:"shape"},{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListConcatV2",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"}],attrs:[{tfName:"element_shape",name:"elementShape",type:"shape"},{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListPopBack",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"elementShape",type:"shape"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListPushBack",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"tensor",type:"tensor"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListLength",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"}]},{tfOpName:"TensorListResize",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"size",type:"number"}]}]},Symbol.toStringTag,{value:"Module"})),kf=Object.freeze(Object.defineProperty({__proto__:null,json:[{tfOpName:"AvgPool",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0},{tfName:"ksize",name:"kernelSize",type:"number[]"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"MaxPool",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0},{tfName:"ksize",name:"kernelSize",type:"number[]"},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[],notSupported:!0},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"MaxPoolWithArgmax",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"ksize",name:"kernelSize",type:"number[]"},{tfName:"include_batch_in_index",name:"includeBatchInIndex",type:"bool"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"AvgPool3D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0},{tfName:"ksize",name:"kernelSize",type:"number[]"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"MaxPool3D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0},{tfName:"ksize",name:"kernelSize",type:"number[]"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Conv1D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"stride",name:"stride",type:"number"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NWC"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"dilation",name:"dilation",type:"number",defaultValue:1}]},{tfOpName:"Conv2D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"useCudnnOnGpu",name:"useCudnnOnGpu",type:"bool"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[]},{tfName:"dilations",name:"dilations",type:"number[]"}]},{tfOpName:"_FusedConv2D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"},{start:2,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"num_args",name:"numArgs",type:"number"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[]},{tfName:"use_cudnn_on_gpu",name:"useCudnnOnGpu",type:"bool",defaultValue:!0},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"dilations",name:"dilations",type:"number[]",defaultValue:[1,1,1,1]},{tfName:"fused_ops",name:"fusedOps",type:"string[]",defaultValue:[]},{tfName:"epsilon",name:"epsilon",type:"number",defaultValue:1e-4},{tfName:"leakyrelu_alpha",name:"leakyreluAlpha",type:"number",defaultValue:.2}]},{tfOpName:"Conv2DBackpropInput",category:"convolution",inputs:[{start:2,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"},{start:0,name:"outputShape",type:"number[]"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[]},{tfName:"dilations",name:"dilations",type:"number[]",notSupported:!0}]},{tfOpName:"DepthwiseConv2d",category:"convolution",inputs:[{start:0,name:"input",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[]},{tfName:"dilations",name:"dilations",type:"number[]"}]},{tfOpName:"DepthwiseConv2dNative",category:"convolution",inputs:[{start:0,name:"input",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[]},{tfName:"dilations",name:"dilations",type:"number[]"}]},{tfOpName:"FusedDepthwiseConv2dNative",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"},{start:2,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"num_args",name:"numArgs",type:"number"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"dilations",name:"dilations",type:"number[]",defaultValue:[1,1,1,1]},{tfName:"fused_ops",name:"fusedOps",type:"string[]",defaultValue:[]},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[]}]},{tfOpName:"Conv3D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"dilations",name:"dilations",type:"number[]"}]},{tfOpName:"Dilation2D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"rates",name:"dilations",type:"number[]"},{tfName:"padding",name:"pad",type:"string"}]}]},Symbol.toStringTag,{value:"Module"})),Ef=Object.freeze(Object.defineProperty({__proto__:null,json:[{tfOpName:"Fill",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"},{start:1,name:"value",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"LinSpace",category:"creation",inputs:[{start:0,name:"start",type:"number"},{start:1,name:"stop",type:"number"},{start:2,name:"num",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"OneHot",category:"creation",inputs:[{start:0,name:"indices",type:"tensor"},{start:1,name:"depth",type:"number"},{start:2,name:"onValue",type:"number",defaultValue:1},{start:3,name:"offValue",type:"number",defaultValue:0}],attrs:[{tfName:"axis",name:"axis",type:"number",notSupported:!0},{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"Ones",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"OnesLike",category:"creation",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"dtype",name:"dtype",type:"dtype"}]},{tfOpName:"RandomStandardNormal",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"}],attrs:[{tfName:"seed",name:"seed",type:"number",defaultValue:0},{tfName:"seed2",name:"seed2",type:"number",defaultValue:0,notSupported:!0},{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"T",name:"T",type:"number",notSupported:!0}]},{tfOpName:"RandomUniform",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"}],attrs:[{tfName:"minval",name:"minval",type:"number",defaultValue:0},{tfName:"maxval",name:"maxval",type:"number",defaultValue:1},{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"seed",name:"seed",type:"number",defaultValue:0},{tfName:"seed2",name:"seed2",type:"number",defaultValue:0,notSupported:!0},{tfName:"T",name:"T",type:"number",notSupported:!0}]},{tfOpName:"RandomUniformInt",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"}],attrs:[{tfName:"minval",name:"minval",type:"number"},{tfName:"maxval",name:"maxval",type:"number"},{tfName:"seed",name:"seed",type:"number",defaultValue:0},{tfName:"seed2",name:"seed2",type:"number",defaultValue:0,notSupported:!0}]},{tfOpName:"Range",category:"creation",inputs:[{start:0,name:"start",type:"number"},{start:1,name:"stop",type:"number"},{start:2,name:"step",type:"number",defaultValue:0}],attrs:[{tfName:"Tidx",name:"dtype",type:"dtype"}]},{tfOpName:"TruncatedNormal",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"}],attrs:[{tfName:"means",name:"mean",type:"number",defaultValue:0},{tfName:"stddev",name:"stdDev",type:"number",defaultValue:1},{tfName:"seed",name:"seed",type:"number"},{tfName:"seed2",name:"seed2",type:"number",defaultValue:0,notSupported:!0},{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"T",name:"T",type:"number",notSupported:!0}]},{tfOpName:"Zeros",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"ZerosLike",category:"creation",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"Multinomial",category:"creation",inputs:[{start:0,name:"logits",type:"tensor"},{start:1,name:"numSamples",type:"number"}],attrs:[{tfName:"seed",name:"seed",type:"number"},{tfName:"seed2",name:"seed2",type:"number"},{tfName:"T",name:"dtype",type:"dtype"},{tfName:"output_dtype",name:"output_dtype",type:"dtype"}]}]},Symbol.toStringTag,{value:"Module"})),_f=Object.freeze(Object.defineProperty({__proto__:null,json:[{tfOpName:"NonMaxSuppressionV2",category:"dynamic",inputs:[{start:0,name:"boxes",type:"tensor"},{start:1,name:"scores",type:"tensor"},{start:2,name:"maxOutputSize",type:"number"},{start:3,name:"iouThreshold",type:"number"}]},{tfOpName:"NonMaxSuppressionV3",category:"dynamic",inputs:[{start:0,name:"boxes",type:"tensor"},{start:1,name:"scores",type:"tensor"},{start:2,name:"maxOutputSize",type:"number"},{start:3,name:"iouThreshold",type:"number"},{start:4,name:"scoreThreshold",type:"number"}]},{tfOpName:"NonMaxSuppressionV4",category:"dynamic",inputs:[{start:0,name:"boxes",type:"tensor"},{start:1,name:"scores",type:"tensor"},{start:2,name:"maxOutputSize",type:"number"},{start:3,name:"iouThreshold",type:"number"},{start:4,name:"scoreThreshold",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"T_threshold",name:"threshold",type:"dtype",notSupported:!0},{tfName:"pad_to_max_output_size",name:"padToMaxOutputSize",type:"bool"}]},{tfOpName:"NonMaxSuppressionV5",category:"dynamic",inputs:[{start:0,name:"boxes",type:"tensor"},{start:1,name:"scores",type:"tensor"},{start:2,name:"maxOutputSize",type:"number"},{start:3,name:"iouThreshold",type:"number"},{start:4,name:"scoreThreshold",type:"number"},{start:5,name:"softNmsSigma",type:"number"}]},{tfOpName:"Where",category:"dynamic",inputs:[{start:0,name:"condition",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"ListDiff",category:"dynamic",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"y",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]}]},Symbol.toStringTag,{value:"Module"})),If=Object.freeze(Object.defineProperty({__proto__:null,json:[{tfOpName:"LowerBound",category:"evaluation",inputs:[{start:0,name:"sortedSequence",type:"tensor"},{start:1,name:"values",type:"tensor"}]},{tfOpName:"TopKV2",category:"evaluation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"k",type:"number"}],attrs:[{tfName:"sorted",name:"sorted",type:"bool"}]},{tfOpName:"UpperBound",category:"evaluation",inputs:[{start:0,name:"sortedSequence",type:"tensor"},{start:1,name:"values",type:"tensor"}]},{tfOpName:"Unique",category:"evaluation",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"UniqueV2",category:"evaluation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number"}]}]},Symbol.toStringTag,{value:"Module"})),Af=Object.freeze(Object.defineProperty({__proto__:null,json:[{tfOpName:"PlaceholderWithDefault",category:"graph",inputs:[{start:0,name:"default",type:"tensor"}],attrs:[{tfName:"shape",name:"shape",type:"shape"},{tfName:"dtype",name:"dtype",type:"dtype"}]},{tfOpName:"Placeholder",category:"graph",attrs:[{tfName:"shape",name:"shape",type:"shape"},{tfName:"dtype",name:"dtype",type:"dtype"}]},{tfOpName:"Const",category:"graph"},{tfOpName:"Identity",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"IdentityN",category:"graph",inputs:[{start:0,end:0,name:"x",type:"tensors"}]},{tfOpName:"Snapshot",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"Rank",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"Size",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"Shape",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"ShapeN",category:"graph",inputs:[{start:0,end:0,name:"x",type:"tensors"}]},{tfOpName:"Print",category:"graph",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"data",type:"tensors"}],attrs:[{tfName:"message",name:"message",type:"string"},{tfName:"first_n",name:"firstN",type:"number",notSupported:!0},{tfName:"summarize",name:"summarize",type:"number",defaultValue:3}]},{tfOpName:"NoOp",category:"graph",inputs:[]},{tfOpName:"StopGradient",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"FakeQuantWithMinMaxVars",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"min",name:"min",type:"number"},{tfName:"max",name:"max",type:"number"}]}]},Symbol.toStringTag,{value:"Module"})),Mf=Object.freeze(Object.defineProperty({__proto__:null,json:[{tfOpName:"HashTable",category:"hash_table",inputs:[],attrs:[{tfName:"shared_name",name:"sharedName",type:"string"},{tfName:"use_node_name_sharing",name:"useNodeNameSharing",type:"bool"},{tfName:"key_dtype",name:"keyDType",type:"dtype"},{tfName:"value_dtype",name:"valueDType",type:"dtype"}]},{tfOpName:"HashTableV2",category:"hash_table",inputs:[],attrs:[{tfName:"shared_name",name:"sharedName",type:"string"},{tfName:"use_node_name_sharing",name:"useNodeNameSharing",type:"bool"},{tfName:"key_dtype",name:"keyDType",type:"dtype"},{tfName:"value_dtype",name:"valueDType",type:"dtype"}]},{tfOpName:"LookupTableImport",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"},{start:1,name:"keys",type:"tensor"},{start:2,name:"values",type:"tensor"}],attrs:[{tfName:"Tin",name:"tIn",type:"dtype",notSupported:!0},{tfName:"Tout",name:"tOut",type:"dtype",notSupported:!0}]},{tfOpName:"LookupTableImportV2",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"},{start:1,name:"keys",type:"tensor"},{start:2,name:"values",type:"tensor"}],attrs:[{tfName:"Tin",name:"tIn",type:"dtype",notSupported:!0},{tfName:"Tout",name:"tOut",type:"dtype",notSupported:!0}]},{tfOpName:"LookupTableFind",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"},{start:1,name:"keys",type:"tensor"},{start:2,name:"defaultValue",type:"tensor"}],attrs:[{tfName:"Tin",name:"tIn",type:"dtype",notSupported:!0},{tfName:"Tout",name:"tOut",type:"dtype",notSupported:!0}]},{tfOpName:"LookupTableFindV2",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"},{start:1,name:"keys",type:"tensor"},{start:2,name:"defaultValue",type:"tensor"}],attrs:[{tfName:"Tin",name:"tIn",type:"dtype",notSupported:!0},{tfName:"Tout",name:"tOut",type:"dtype",notSupported:!0}]},{tfOpName:"LookupTableSize",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"}]},{tfOpName:"LookupTableSizeV2",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"}]},{tfOpName:"InitializeTable",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"},{start:1,name:"keys",type:"tensor"},{start:2,name:"values",type:"tensor"}]},{tfOpName:"InitializeTableV2",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"},{start:1,name:"keys",type:"tensor"},{start:2,name:"values",type:"tensor"}]}]},Symbol.toStringTag,{value:"Module"})),$f=Object.freeze(Object.defineProperty({__proto__:null,json:[{tfOpName:"ResizeBilinear",category:"image",inputs:[{start:0,name:"images",type:"tensor"},{start:1,name:"size",type:"number[]"}],attrs:[{tfName:"align_corners",name:"alignCorners",type:"bool"},{tfName:"half_pixel_centers",name:"halfPixelCenters",type:"bool"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"ResizeNearestNeighbor",category:"image",inputs:[{start:0,name:"images",type:"tensor"},{start:1,name:"size",type:"number[]"}],attrs:[{tfName:"align_corners",name:"alignCorners",type:"bool"},{tfName:"half_pixel_centers",name:"halfPixelCenters",type:"bool"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"CropAndResize",category:"image",inputs:[{start:0,name:"image",type:"tensor"},{start:1,name:"boxes",type:"tensor"},{start:2,name:"boxInd",type:"tensor"},{start:3,name:"cropSize",type:"number[]"}],attrs:[{tfName:"method",name:"method",type:"string"},{tfName:"extrapolation_value",name:"extrapolationValue",type:"number"}]},{tfOpName:"ImageProjectiveTransformV3",category:"image",inputs:[{start:0,name:"images",type:"tensor"},{start:1,name:"transforms",type:"tensor"},{start:2,name:"outputShape",type:"number[]"},{start:3,name:"fillValue",type:"number"}],attrs:[{tfName:"interpolation",name:"interpolation",type:"string"},{tfName:"fill_mode",name:"fillMode",type:"string"}]}]},Symbol.toStringTag,{value:"Module"})),Of=Object.freeze(Object.defineProperty({__proto__:null,json:[{tfOpName:"Equal",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"NotEqual",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Greater",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"GreaterEqual",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Less",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"LessEqual",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"LogicalAnd",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"LogicalNot",category:"logical",inputs:[{start:0,name:"a",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"LogicalOr",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Select",category:"logical",inputs:[{start:0,name:"condition",type:"tensor"},{start:1,name:"a",type:"tensor"},{start:2,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"SelectV2",category:"logical",inputs:[{start:0,name:"condition",type:"tensor"},{start:1,name:"a",type:"tensor"},{start:2,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"BitwiseAnd",category:"logical",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"y",type:"tensor"}]}]},Symbol.toStringTag,{value:"Module"})),Df=Object.freeze(Object.defineProperty({__proto__:null,json:[{tfOpName:"_FusedMatMul",category:"matrices",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"},{start:2,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"num_args",name:"numArgs",type:"number"},{tfName:"fused_ops",name:"fusedOps",type:"string[]",defaultValue:[]},{tfName:"epsilon",name:"epsilon",type:"number",defaultValue:1e-4},{tfName:"transpose_a",name:"transposeA",type:"bool",defaultValue:!1},{tfName:"transpose_b",name:"transposeB",type:"bool",defaultValue:!1},{tfName:"leakyrelu_alpha",name:"leakyreluAlpha",type:"number",defaultValue:.2},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"MatMul",category:"matrices",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"transpose_a",name:"transposeA",type:"bool",defaultValue:!1},{tfName:"transpose_b",name:"transposeB",type:"bool",defaultValue:!1},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"BatchMatMul",category:"matrices",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"adj_x",name:"transposeA",type:"bool",defaultValue:!1},{tfName:"adj_y",name:"transposeB",type:"bool",defaultValue:!1},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"BatchMatMulV2",category:"matrices",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"adj_x",name:"transposeA",type:"bool",defaultValue:!1},{tfName:"adj_y",name:"transposeB",type:"bool",defaultValue:!1},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Transpose",category:"matrices",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"perm",type:"number[]"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Einsum",category:"matrices",inputs:[{start:0,end:0,name:"tensors",type:"tensors"}],attrs:[{tfName:"equation",name:"equation",type:"string"},{tfName:"N",name:"n",type:"number",defaultValue:2},{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"MatrixBandPart",category:"matrices",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"numLower",type:"tensor"},{start:1,name:"numUpper",type:"tensor"}]}]},Symbol.toStringTag,{value:"Module"})),Rf=Object.freeze(Object.defineProperty({__proto__:null,json:[{tfOpName:"EuclideanNorm",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool",defaultValue:!1}]},{tfOpName:"FusedBatchNorm",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"scale",type:"tensor"},{start:2,name:"offset",type:"tensor"},{start:3,name:"mean",type:"tensor"},{start:4,name:"variance",type:"tensor"}],attrs:[{tfName:"epsilon",name:"epsilon",type:"number",defaultValue:.001},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0}]},{tfOpName:"FusedBatchNormV2",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"scale",type:"tensor"},{start:2,name:"offset",type:"tensor"},{start:3,name:"mean",type:"tensor"},{start:4,name:"variance",type:"tensor"}],attrs:[{tfName:"epsilon",name:"epsilon",type:"number",defaultValue:.001},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0}]},{tfOpName:"FusedBatchNormV3",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"scale",type:"tensor"},{start:2,name:"offset",type:"tensor"},{start:3,name:"mean",type:"tensor"},{start:4,name:"variance",type:"tensor"}],attrs:[{tfName:"epsilon",name:"epsilon",type:"number",defaultValue:.001},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0}]},{tfOpName:"LRN",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"depth_radius",name:"radius",type:"number",defaultValue:5},{tfName:"bias",name:"bias",type:"number",defaultValue:1},{tfName:"alpha",name:"alpha",type:"number",defaultValue:1},{tfName:"beta",name:"beta",type:"number",defaultValue:.5}]},{tfOpName:"Softmax",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"LogSoftmax",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"}]}]},Symbol.toStringTag,{value:"Module"})),Cf=Object.freeze(Object.defineProperty({__proto__:null,json:[{tfOpName:"Bincount",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"size",type:"number"},{start:2,name:"weights",type:"tensor"}]},{tfOpName:"DenseBincount",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"size",type:"number"},{start:2,name:"weights",type:"tensor"}],attrs:[{tfName:"binary_output",name:"binaryOutput",type:"bool"}]},{tfOpName:"Max",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"Mean",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"Min",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"Sum",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"All",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"Any",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"ArgMax",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number"}]},{tfOpName:"ArgMin",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number"}]},{tfOpName:"Prod",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Cumprod",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number"}],attrs:[{tfName:"exclusive",name:"exclusive",type:"bool"},{tfName:"reverse",name:"reverse",type:"bool"}]},{tfOpName:"Cumsum",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number"}],attrs:[{tfName:"exclusive",name:"exclusive",type:"bool"},{tfName:"reverse",name:"reverse",type:"bool"}]}]},Symbol.toStringTag,{value:"Module"})),Ff=Object.freeze(Object.defineProperty({__proto__:null,json:[{tfOpName:"ConcatV2",category:"slice_join",inputs:[{start:0,end:-1,name:"tensors",type:"tensors"},{start:-1,name:"axis",type:"number"}],attrs:[{tfName:"N",name:"n",type:"number",defaultValue:2}]},{tfOpName:"Concat",category:"slice_join",inputs:[{start:1,end:0,name:"tensors",type:"tensors"},{start:0,name:"axis",type:"number"}],attrs:[{tfName:"N",name:"n",type:"number",defaultValue:2}]},{tfOpName:"GatherV2",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"indices",type:"tensor"},{start:2,name:"axis",type:"number",defaultValue:0}],attrs:[{tfName:"batch_dims",name:"batchDims",type:"number",defaultValue:0}]},{tfOpName:"Gather",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"indices",type:"tensor"}],attrs:[{tfName:"validate_indices",name:"validateIndices",type:"bool",notSupported:!0}]},{tfOpName:"Reverse",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"dims",type:"bool[]"}]},{tfOpName:"ReverseV2",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}]},{tfOpName:"Slice",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"begin",type:"number[]"},{start:2,name:"size",type:"number[]"}]},{tfOpName:"StridedSlice",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"begin",type:"number[]"},{start:2,name:"end",type:"number[]"},{start:3,name:"strides",type:"number[]"}],attrs:[{tfName:"begin_mask",name:"beginMask",type:"number",defaultValue:0},{tfName:"end_mask",name:"endMask",type:"number",defaultValue:0},{tfName:"new_axis_mask",name:"newAxisMask",type:"number",defaultValue:0},{tfName:"ellipsis_mask",name:"ellipsisMask",type:"number",defaultValue:0},{tfName:"shrink_axis_mask",name:"shrinkAxisMask",type:"number",defaultValue:0}]},{tfOpName:"Pack",category:"slice_join",inputs:[{start:0,end:0,name:"tensors",type:"tensors"}],attrs:[{tfName:"axis",name:"axis",type:"number",defaultValue:0}]},{tfOpName:"Unpack",category:"slice_join",inputs:[{start:0,name:"tensor",type:"tensor"}],attrs:[{tfName:"axis",name:"axis",type:"number",defaultValue:0},{tfName:"num",name:"num",type:"number",defaultValue:0,notSupported:!0}]},{tfOpName:"Tile",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"reps",type:"number[]"}]},{tfOpName:"Split",category:"slice_join",inputs:[{start:0,name:"axis",type:"number",defaultValue:0},{start:1,name:"x",type:"tensor"}],attrs:[{tfName:"num_split",name:"numOrSizeSplits",type:"number",defaultValue:1}]},{tfOpName:"SplitV",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"numOrSizeSplits",type:"number[]"},{start:2,name:"axis",type:"number",defaultValue:0}]},{tfOpName:"ScatterNd",category:"slice_join",inputs:[{start:0,name:"indices",type:"tensor"},{start:1,name:"values",type:"tensor"},{start:2,name:"shape",type:"number[]"}]},{tfOpName:"GatherNd",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"indices",type:"tensor"}]},{tfOpName:"SparseToDense",category:"slice_join",inputs:[{start:0,name:"sparseIndices",type:"tensor"},{start:1,name:"outputShape",type:"number[]"},{start:2,name:"sparseValues",type:"tensor"},{start:3,name:"defaultValue",type:"tensor"}],attrs:[{tfName:"validate_indices",name:"validateIndices",type:"bool",defaultValue:!1,notSupported:!0}]},{tfOpName:"TensorScatterUpdate",category:"slice_join",inputs:[{start:0,name:"tensor",type:"tensor"},{start:1,name:"indices",type:"tensor"},{start:2,name:"values",type:"tensor"}]}]},Symbol.toStringTag,{value:"Module"})),Bf=Object.freeze(Object.defineProperty({__proto__:null,json:[{tfOpName:"SparseFillEmptyRows",category:"sparse",inputs:[{start:0,name:"indices",type:"tensor"},{start:1,name:"values",type:"tensor"},{start:2,name:"denseShape",type:"tensor"},{start:3,name:"defaultValue",type:"tensor"}]},{tfOpName:"SparseReshape",category:"sparse",inputs:[{start:0,name:"inputIndices",type:"tensor"},{start:1,name:"inputShape",type:"tensor"},{start:2,name:"newShape",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"SparseSegmentMean",category:"sparse",inputs:[{start:0,name:"data",type:"tensor"},{start:1,name:"indices",type:"tensor"},{start:2,name:"segmentIds",type:"tensor"}]},{tfOpName:"SparseSegmentSum",category:"sparse",inputs:[{start:0,name:"data",type:"tensor"},{start:1,name:"indices",type:"tensor"},{start:2,name:"segmentIds",type:"tensor"}]}]},Symbol.toStringTag,{value:"Module"})),zf=Object.freeze(Object.defineProperty({__proto__:null,json:[{tfOpName:"FFT",category:"spectral",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"IFFT",category:"spectral",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"RFFT",category:"spectral",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"fft_length",type:"number",notSupported:!0}]},{tfOpName:"IRFFT",category:"spectral",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"fft_length",type:"number",notSupported:!0}]}]},Symbol.toStringTag,{value:"Module"})),Lf=Object.freeze(Object.defineProperty({__proto__:null,json:[{tfOpName:"StaticRegexReplace",category:"string",inputs:[{start:0,name:"input",type:"tensor"}],attrs:[{tfName:"pattern",name:"pattern",type:"string"},{tfName:"rewrite",name:"rewrite",type:"string"},{tfName:"replace_global",name:"replaceGlobal",type:"bool"}]},{tfOpName:"StringNGrams",category:"string",inputs:[{start:0,name:"data",type:"tensor"},{start:1,name:"dataSplits",type:"tensor"}],attrs:[{tfName:"separator",name:"separator",type:"string"},{tfName:"ngram_widths",name:"nGramWidths",type:"number[]"},{tfName:"left_pad",name:"leftPad",type:"string"},{tfName:"right_pad",name:"rightPad",type:"string"},{tfName:"pad_width",name:"padWidth",type:"number"},{tfName:"preserve_short_sequences",name:"preserveShortSequences",type:"bool"}],outputs:["ngrams","ngrams_splits"]},{tfOpName:"StringSplit",category:"string",inputs:[{start:0,name:"input",type:"tensor"},{start:1,name:"delimiter",type:"tensor"}],attrs:[{tfName:"skip_empty",name:"skipEmpty",type:"bool"}],outputs:["indices","values","shape"]},{tfOpName:"StringToHashBucketFast",category:"string",inputs:[{start:0,name:"input",type:"tensor"}],attrs:[{tfName:"num_buckets",name:"numBuckets",type:"number"}]}]},Symbol.toStringTag,{value:"Module"})),Pf=Object.freeze(Object.defineProperty({__proto__:null,json:[{tfOpName:"Cast",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"SrcT",name:"sdtype",type:"dtype",notSupported:!0},{tfName:"DstT",name:"dtype",type:"dtype"}]},{tfOpName:"ExpandDims",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number"}]},{tfOpName:"MirrorPad",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"padding",type:"number[]"}],attrs:[{tfName:"mode",name:"mode",type:"string"}]},{tfOpName:"Pad",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"padding",type:"number[]"}],attrs:[{tfName:"constant_value",name:"constantValue",type:"number",defaultValue:0}]},{tfOpName:"PadV2",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"padding",type:"number[]"},{start:2,name:"constantValue",type:"number",defaultValue:0}]},{tfOpName:"Reshape",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"shape",type:"number[]"}]},{tfOpName:"EnsureShape",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"shape",type:"number[]"}]},{tfOpName:"Squeeze",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"axis",tfDeprecatedName:"squeeze_dims",name:"axis",type:"number[]"}]},{tfOpName:"SpaceToBatchND",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"blockShape",type:"number[]"},{start:2,name:"paddings",type:"number[]"}]},{tfOpName:"BatchToSpaceND",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"blockShape",type:"number[]"},{start:2,name:"crops",type:"number[]"}]},{tfOpName:"DepthToSpace",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"block_size",name:"blockSize",type:"number"},{tfName:"data_format",name:"dataFormat",type:"string"}]},{tfOpName:"BroadcastTo",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"shape",type:"number[]"}],attrs:[]},{tfOpName:"BroadcastArgs",category:"transformation",inputs:[{start:0,name:"s0",type:"tensor"},{start:1,name:"s1",type:"tensor"}],attrs:[]}]},Symbol.toStringTag,{value:"Module"}));
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
class Vf{static get Instance(){return this._instance||(this._instance=new this)}constructor(){const e=[].concat(...[Sf,vf,Tf,kf,Ef,_f,If,Af,Mf,$f,Of,Df,Rf,Cf,Ff,Bf,zf,Lf,Pf].map(e=>e.json));this.opMappers=e.reduce((e,t)=>(e[t.tfOpName]=t,e),{})}transformGraph(e,t={}){const n=e.node,r=[],a=[],s=[],o=n.reduce((e,t)=>(e[t.name]=this.mapNode(t),t.op.startsWith("Placeholder")?r.push(e[t.name]):"Const"===t.op?a.push(e[t.name]):null!=t.input&&0!==t.input.length||s.push(e[t.name]),e),{});let i=[];const u=[];let l={},c={};null!=t&&(l=this.mapSignatureEntries(t.inputs),c=this.mapSignatureEntries(t.outputs));const p=Object.keys(o);p.forEach(e=>{const t=o[e];t.inputNames.forEach((e,n)=>{const[r,,a]=yf(e),s=o[r];if(null!=s.outputs){const e=s.outputs.indexOf(a);if(-1!==e){const a=`${r}:${e}`;t.inputNames[n]=a}}t.inputs.push(s),s.children.push(t)})}),0===Object.keys(c).length?p.forEach(e=>{const t=o[e];0===t.children.length&&u.push(t)}):Object.keys(c).forEach(e=>{const[t]=yf(e),n=o[t];null!=n&&(n.signatureKey=c[e],u.push(n))}),Object.keys(l).length>0?Object.keys(l).forEach(e=>{const[t]=yf(e),n=o[t];n&&(n.signatureKey=l[e],i.push(n))}):i=r;let d={};null!=e.library&&null!=e.library.function&&(d=e.library.function.reduce((e,t)=>(e[t.signature.name]=this.mapFunction(t),e),{}));const h={nodes:o,inputs:i,outputs:u,weights:a,placeholders:r,signature:t,functions:d};return s.length>0&&(h.initNodes=s),h}mapSignatureEntries(e){return Object.keys(e||{}).reduce((t,n)=>(t[e[n].name]=n,t),{})}mapNode(e){const t=df(e.op)||this.opMappers[e.op]||{};null==e.attr&&(e.attr={});const n={name:e.name,op:e.op,category:t.category,inputNames:(e.input||[]).map(e=>e.startsWith("^")?e.slice(1):e),inputs:[],children:[],inputParams:{},attrParams:{},rawAttrs:e.attr,outputs:t.outputs};return null!=t.inputs&&(n.inputParams=t.inputs.reduce((e,t)=>(e[t.name]={type:t.type,inputIndexStart:t.start,inputIndexEnd:t.end},e),{})),null!=t.attrs&&(n.attrParams=t.attrs.reduce((t,n)=>{const r=n.type;let a;switch(n.type){case"string":a=jf(e.attr,n.tfName,n.defaultValue),void 0===a&&n.tfDeprecatedName&&(a=jf(e.attr,n.tfDeprecatedName,n.defaultValue));break;case"string[]":a=Qf(e.attr,n.tfName,n.defaultValue),void 0===a&&n.tfDeprecatedName&&(a=Qf(e.attr,n.tfDeprecatedName,n.defaultValue));break;case"number":a=Gf(e.attr,n.tfName,n.defaultValue||0),void 0===a&&n.tfDeprecatedName&&(a=Gf(e.attr,n.tfDeprecatedName,n.defaultValue));break;case"number[]":a=Yf(e.attr,n.tfName,n.defaultValue),void 0===a&&n.tfDeprecatedName&&(a=Yf(e.attr,n.tfDeprecatedName,n.defaultValue));break;case"bool":a=Wf(e.attr,n.tfName,n.defaultValue),void 0===a&&n.tfDeprecatedName&&(a=Wf(e.attr,n.tfDeprecatedName,n.defaultValue));break;case"bool[]":a=tg(e.attr,n.tfName,n.defaultValue),void 0===a&&n.tfDeprecatedName&&(a=tg(e.attr,n.tfDeprecatedName,n.defaultValue));break;case"shape":a=Xf(e.attr,n.tfName,n.defaultValue),void 0===a&&n.tfDeprecatedName&&(a=Xf(e.attr,n.tfDeprecatedName,n.defaultValue));break;case"shape[]":a=eg(e.attr,n.tfName,n.defaultValue),void 0===a&&n.tfDeprecatedName&&(a=eg(e.attr,n.tfDeprecatedName,n.defaultValue));break;case"dtype":a=Hf(e.attr,n.tfName,n.defaultValue),void 0===a&&n.tfDeprecatedName&&(a=Hf(e.attr,n.tfDeprecatedName,n.defaultValue));break;case"dtype[]":a=Zf(e.attr,n.tfName,n.defaultValue),void 0===a&&n.tfDeprecatedName&&(a=Zf(e.attr,n.tfDeprecatedName,n.defaultValue));break;case"func":a=Kf(e.attr,n.tfName,n.defaultValue),void 0===a&&n.tfDeprecatedName&&(a=Kf(e.attr,n.tfDeprecatedName,n.defaultValue));break;case"tensor":case"tensors":break;default:throw new Error(`Unsupported param type: ${n.type} for op: ${e.op}`)}return t[n.name]={value:a,type:r},t},{})),n}mapFunction(e){const t=e.nodeDef,n=[];let r={};null!=t&&(r=t.reduce((e,t)=>(e[t.name]=this.mapNode(t),"Const"===t.op&&n.push(e[t.name]),e),{}));const a=[],s=[];e.signature.inputArg.forEach(e=>{const[t]=yf(e.name),n={name:t,op:"Placeholder",inputs:[],inputNames:[],category:"graph",inputParams:{},attrParams:{dtype:{value:qf(e.type),type:"dtype"}},children:[]};n.signatureKey=e.name,a.push(n),r[t]=n});Object.keys(r).forEach(e=>{const t=r[e];t.inputNames.forEach((e,n)=>{const[a,,s]=yf(e),o=r[a];if(null!=o.outputs){const e=o.outputs.indexOf(s);if(-1!==e){const r=`${a}:${e}`;t.inputNames[n]=r}}t.inputs.push(o),o.children.push(t)})});const o=e.ret;e.signature.outputArg.forEach(e=>{const[t,n]=yf(o[e.name]),a=r[t];null!=a&&(a.defaultOutput=n,s.push(a))});const i=this.mapArgsToSignature(e);return{nodes:r,inputs:a,outputs:s,weights:n,placeholders:[],signature:i}}mapArgsToSignature(e){return{methodName:e.signature.name,inputs:e.signature.inputArg.reduce((e,t)=>(e[t.name]=this.mapArgToTensorInfo(t),e),{}),outputs:e.signature.outputArg.reduce((t,n)=>(t[n.name]=this.mapArgToTensorInfo(n,e.ret),t),{})}}mapArgToTensorInfo(e,t){let n=e.name;return null!=t&&(n=t[n]),{name:n,dtype:e.type}}}function Uf(e,t){const n=Array.isArray(e)?String.fromCharCode.apply(null,e):function(e){const t=X().global;if(void 0!==t.atob)return t.atob(e);if("undefined"!=typeof Buffer)return new Buffer(e,"base64").toString();throw new Error("Unable to decode base64 in this environment. Missing built-in atob() or Buffer()")}(e);return t?n:n.toLowerCase()}function jf(e,t,n,r=!1){const a=e[t];return null!=a?Uf(a.s,r):n}function Wf(e,t,n){const r=e[t];return r?r.b:n}function Gf(e,t,n){const r=e[t]||{},a=null!=r.i?r.i:null!=r.f?r.f:n;return"number"==typeof a?a:parseInt(a,10)}function qf(e){switch("string"==typeof e&&(e=af[e]),e){case af.DT_FLOAT:case af.DT_HALF:return"float32";case af.DT_INT32:case af.DT_INT64:case af.DT_INT8:case af.DT_UINT8:return"int32";case af.DT_BOOL:return"bool";case af.DT_DOUBLE:return"float32";case af.DT_STRING:return"string";case af.DT_COMPLEX64:case af.DT_COMPLEX128:return"complex64";default:return null}}function Kf(e,t,n){const r=e[t];return r&&r.func?r.func.name:n}function Hf(e,t,n){const r=e[t];return r&&r.type?qf(r.type):n}function Zf(e,t,n){const r=e[t];return r&&r.list&&r.list.type?r.list.type.map(e=>qf(e)):n}function Jf(e){if(!e.unknownRank)return null!=e.dim?e.dim.map(e=>"number"==typeof e.size?e.size:parseInt(e.size,10)):[]}function Xf(e,t,n){const r=e[t];return r&&r.shape?Jf(r.shape):n}function Yf(e,t,n){const r=e[t];return r?((r.list.f&&r.list.f.length?r.list.f:r.list.i)||[]).map(e=>"number"==typeof e?e:parseInt(e,10)):n}function Qf(e,t,n,r=!1){const a=e[t];return a&&a.list&&a.list.s?a.list.s.map(e=>Uf(e,r)):n}function eg(e,t,n){const r=e[t];return r&&r.list&&r.list.shape?r.list.shape.map(e=>Jf(e)):n}function tg(e,t,n){const r=e[t];return r&&r.list&&r.list.b?r.list.b:n}
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class ng{constructor(e,t,n){this.node=e,this.tensorMap=t,this.context=n,this.inputs=[],this.attrs={},this.inputs=e.inputNames.map(e=>this.getInput(e)),null!=e.rawAttrs&&(this.attrs=Object.keys(e.rawAttrs).reduce((e,t)=>(e[t]=this.getAttr(t),e),{}))}getInput(e){return ff(e,this.tensorMap,this.context)}getAttr(e,t){const n=this.node.rawAttrs[e];if(null!=n.tensor)return ff(e,this.tensorMap,this.context);if(null!=n.i||null!=n.f)return Gf(this.node.rawAttrs,e,t);if(null!=n.s)return jf(this.node.rawAttrs,e,t);if(null!=n.b)return Wf(this.node.rawAttrs,e,t);if(null!=n.shape)return Xf(this.node.rawAttrs,e,t);if(null!=n.type)return Hf(this.node.rawAttrs,e,t);if(null!=n.list){if(null!=n.list.i||null!=n.list.f)return Yf(this.node.rawAttrs,e,t);if(null!=n.list.s)return Qf(this.node.rawAttrs,e,t);if(null!=n.list.shape)return eg(this.node.rawAttrs,e,t);if(null!=n.list.b)return tg(this.node.rawAttrs,e,t);if(null!=n.list.type)return Zf(this.node.rawAttrs,e,t)}return t}}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const rg=Object.freeze(Object.defineProperty({__proto__:null,OP_SCOPE_SUFFIX:rs,abs:Co,acos:Fo,acosh:Bo,add:$o,addN:zo,all:Lo,any:Po,argMax:Vo,argMin:Uo,asin:jo,asinh:Wo,atan:Go,atan2:qo,atanh:Ko,avgPool:ci,avgPool3d:pi,basicLSTMCell:yi,batchNorm:wi,batchNorm2d:xi,batchNorm3d:Ni,batchNorm4d:Si,batchToSpaceND:bi,bincount:vi,bitwiseAnd:Ti,booleanMaskAsync:vp,broadcastArgs:ki,broadcastTo:Ei,buffer:_o,cast:Io,ceil:_i,clipByValue:Ai,clone:Ao,complex:ss,concat:di,concat1d:Mi,concat2d:$i,concat3d:Oi,concat4d:Di,conv1d:Ci,conv2d:Ri,conv2dTranspose:Bi,conv3d:zi,conv3dTranspose:Pi,cos:Vi,cosh:Ui,cosineWindow:$p,cumprod:ji,cumsum:Wi,denseBincount:Gi,depthToSpace:qi,depthwiseConv2d:Ki,diag:Hi,dilation2d:Zi,div:Do,divNoNan:ru,dot:au,dropout:Ap,einsum:su,elu:ou,enclosingPowerOfTwo:Mp,ensureShape:iu,equal:eu,erf:uu,euclideanNorm:Eu,exp:_u,expandDims:Iu,expm1:Au,eye:$u,fft:qc,fill:Ii,floor:Ou,floorDiv:Oo,fused:jp,gather:Du,gatherND:Ip,greater:Ru,greaterEqual:Cu,ifft:Kc,imag:Fu,image:Fd,inTopKAsync:Op,irfft:Hc,isFinite:Bu,isInf:zu,isNaN:Lu,leakyRelu:Pu,less:Vu,lessEqual:Uu,linalg:Bd,linspace:ju,localResponseNormalization:Wu,log:Gu,log1p:qu,logSigmoid:nl,logSoftmax:al,logSumExp:sl,logicalAnd:ol,logicalNot:il,logicalOr:ul,logicalXor:ll,losses:zd,lowerBound:dl,matMul:hi,max:yu,maxPool:hl,maxPool3d:ml,maxPoolWithArgmax:fl,maximum:gl,mean:yl,meshgrid:xl,min:bu,minimum:Nl,mirrorPad:Sl,mod:vl,moments:Tl,movingAverage:kp,mul:Ro,multiRNNCell:kl,multinomial:El,neg:el,norm:ku,notEqual:_l,oneHot:Il,ones:wl,onesLike:Al,op:as,outerProduct:Ml,pad:$l,pad1d:Ol,pad2d:Dl,pad3d:Rl,pad4d:Cl,pool:Bl,pow:wu,prelu:zl,print:Mo,prod:Ll,raggedGather:Pl,raggedRange:Vl,raggedTensorToTensor:Ul,rand:jl,randomGamma:bc,randomNormal:wc,randomStandardNormal:xc,randomUniform:Nc,randomUniformInt:Sc,range:vc,real:Tc,reciprocal:kc,relu:Ec,relu6:_c,reshape:li,reverse:Ic,reverse1d:Ac,reverse2d:Mc,reverse3d:$c,reverse4d:Oc,rfft:Jc,round:Dc,rsqrt:Rc,scalar:xu,scatterND:Ep,searchSorted:pl,selu:Cc,separableConv2d:Fc,setdiff1dAsync:Bc,sigmoid:mi,sign:zc,signal:Cd,sin:Lc,sinh:Pc,slice:fi,slice1d:Vc,slice2d:Uc,slice3d:jc,slice4d:Wc,softmax:Gc,softplus:tl,spaceToBatchND:Fl,sparse:Ld,sparseToDense:_p,spectral:Rd,split:Zc,sqrt:Nu,square:Su,squaredDifference:Xc,squeeze:Yc,stack:Qc,step:ep,stridedSlice:tp,string:Pd,sub:rl,sum:vu,tan:np,tanh:gi,tensor:is,tensor1d:rp,tensor2d:ap,tensor3d:sp,tensor4d:op,tensor5d:ip,tensor6d:up,tensorScatterUpdate:hp,tile:Mu,topk:mp,transpose:Tp,truncatedNormal:fp,unique:gp,unsortedSegmentSum:yp,unstack:bp,upperBound:wp,variable:xp,where:tu,whereAsync:Sp,zeros:bl,zerosLike:nu},Symbol.toStringTag,{value:"Module"}));
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function ag(e,t,n=""){if("number"!=typeof e&&"number"!=typeof t){p(e.length===t.length,()=>n+` Shapes ${e} and ${t} must match`);for(let r=0;r<e.length;r++){const a=e[r],s=t[r];p(a<0||s<0||a===s,()=>n+` Shapes ${e} and ${t} must match`)}}}function sg(e){return"number"!=typeof e&&!e.some(e=>e<0)}function og(e,t,n){let r=ig(e,n);const a=!sg(r);if(a&&0===t.length)throw new Error(`Tried to calculate elements of an empty list with non-fully-defined elementShape: ${r}`);if(a&&t.forEach(e=>{r=ig(e.shape,r)}),!sg(r))throw new Error(`Non-fully-defined elementShape: ${r}`);return r}function ig(e,t){if("number"==typeof e)return t;if("number"==typeof t)return e;if(e.length!==t.length)throw new Error(`Incompatible ranks during merge: ${e} vs. ${t}`);const n=[];for(let r=0;r<e.length;++r){const a=e[r],s=t[r];if(a>=0&&s>=0&&a!==s)throw new Error(`Incompatible shape during merge: ${e} vs. ${t}`);n[r]=a>=0?a:s}return n}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class ug{constructor(e,t,n,r,a,s,o){this.name=e,this.dtype=t,this.maxSize=n,this.elementShape=r,this.identicalElementShapes=a,this.dynamicSize=s,this.clearAfterRead=o,this.tensors=[],this.closed_=!1,this.idTensor=xu(0),xs(this.idTensor)}get id(){return this.idTensor.id}get closed(){return this.closed_}clearAndClose(e){this.tensors.forEach(t=>{null!=e&&e.has(t.tensor.id)||t.tensor.dispose()}),this.tensors=[],this.closed_=!0,this.idTensor.dispose()}size(){return this.tensors.length}read(e){if(this.closed_)throw new Error(`TensorArray ${this.name} has already been closed.`);if(e<0||e>=this.size())throw new Error(`Tried to read from index ${e}, but array size is: ${this.size()}`);const t=this.tensors[e];if(t.cleared)throw new Error(`TensorArray ${this.name}: Could not read index ${e} twice because it was cleared after a previous read (perhaps try setting clear_after_read = false?).`);return this.clearAfterRead&&(t.cleared=!0),t.read=!0,t.tensor}readMany(e){return e.map(e=>this.read(e))}write(e,t){if(this.closed_)throw new Error(`TensorArray ${this.name} has already been closed.`);if(e<0||!this.dynamicSize&&e>=this.maxSize)throw new Error(`Tried to write to index ${e}, but array is not resizeable and size is: ${this.maxSize}`);const n=this.tensors[e]||{};if(t.dtype!==this.dtype)throw new Error(`TensorArray ${this.name}: Could not write to TensorArray index ${e},\n          because the value dtype is ${t.dtype}, but TensorArray dtype is ${this.dtype}.`);if(0!==this.size()||null!=this.elementShape&&0!==this.elementShape.length||(this.elementShape=t.shape),ag(this.elementShape,t.shape,`TensorArray ${this.name}: Could not write to TensorArray index ${e}.`),n.read)throw new Error(`TensorArray ${this.name}: Could not write to TensorArray index ${e}, because it has already been read.`);if(n.written)throw new Error(`TensorArray ${this.name}: Could not write to TensorArray index ${e}, because it has already been written.`);n.tensor=t,xs(t),n.written=!0,this.tensors[e]=n}writeMany(e,t){if(e.length!==t.length)throw new Error(`TensorArray ${this.name}: could not write multiple tensors,because the index size: ${e.length} is not the same as tensors size: ${t.length}.`);e.forEach((e,n)=>this.write(e,t[n]))}gather(e,t){if(t&&t!==this.dtype)throw new Error(`TensorArray dtype is ${this.dtype} but gather requested dtype ${t}`);if(e)e=e.slice(0,this.size());else{e=[];for(let t=0;t<this.size();t++)e.push(t)}if(0===e.length)return is([],[0].concat(this.elementShape));const n=this.readMany(e);return ag(this.elementShape,n[0].shape,"TensorArray shape mismatch: "),Qc(n,0)}concat(e){if(e&&e!==this.dtype)throw new Error(`TensorArray dtype is ${this.dtype} but concat requested dtype ${e}`);if(0===this.size())return is([],[0].concat(this.elementShape));const t=[];for(let r=0;r<this.size();r++)t.push(r);const n=this.readMany(t);return ag(this.elementShape,n[0].shape,`TensorArray shape mismatch: tensor array shape (${this.elementShape}) vs first tensor shape (${n[0].shape})`),di(n,0)}scatter(e,t){if(t.dtype!==this.dtype)throw new Error(`TensorArray dtype is ${this.dtype} but tensor has dtype ${t.dtype}`);if(e.length!==t.shape[0])throw new Error(`Expected len(indices) == tensor.shape[0], but saw: ${e.length} vs. ${t.shape[0]}`);const n=Math.max(...e);if(!this.dynamicSize&&n>=this.maxSize)throw new Error(`Max index must be < array size (${n}  vs. ${this.maxSize})`);this.writeMany(e,bp(t,0))}split(e,t){if(t.dtype!==this.dtype)throw new Error(`TensorArray dtype is ${this.dtype} but tensor has dtype ${t.dtype}`);let n=0;const r=e.map(e=>(n+=e,n));if(n!==t.shape[0])throw new Error(`Expected sum of lengths to be equal to\n          tensor.shape[0], but sum of lengths is\n        ${n}, and tensor's shape is: ${t.shape}`);if(!this.dynamicSize&&e.length!==this.maxSize)throw new Error(`TensorArray's size is not equal to the size of lengths (${this.maxSize} vs. ${e.length}), and the TensorArray is not marked as dynamically resizeable`);const a=0===n?0:t.size/n,s=[];bs(()=>{t=li(t,[1,n,a]);for(let n=0;n<e.length;++n){const o=[0,0===n?0:r[n-1],0],i=[1,e[n],a];s[n]=li(fi(t,o,i),this.elementShape)}return s});const o=[];for(let i=0;i<e.length;i++)o[i]=i;this.writeMany(o,s)}}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class lg{get id(){return this.idTensor.id}constructor(e,t,n,r=-1){this.tensors=e,this.elementShape=t,this.elementDtype=n,null!=e&&e.forEach(e=>{if(n!==e.dtype)throw new Error(`Invalid data types; op elements ${n}, but list elements ${e.dtype}`);ag(t,e.shape,"TensorList shape mismatch: "),xs(e)}),this.idTensor=xu(0),this.maxNumElements=r,xs(this.idTensor)}copy(){return new lg([...this.tensors],this.elementShape,this.elementDtype)}clearAndClose(e){this.tensors.forEach(t=>{null!=e&&e.has(t.id)||t.dispose()}),this.tensors.length=0,this.idTensor.dispose()}size(){return this.tensors.length}stack(e,t,n=-1){if(t!==this.elementDtype)throw new Error(`Invalid data types; op elements ${t}, but list elements ${this.elementDtype}`);if(-1!==n&&this.tensors.length!==n)throw new Error(`Operation expected a list with ${n} elements but got a list with ${this.tensors.length} elements.`);ag(e,this.elementShape,"TensorList shape mismatch: ");const r=og(this.elementShape,this.tensors,e);return bs(()=>{const e=this.tensors.map(e=>li(e,r));return Qc(e,0)})}popBack(e,t){if(t!==this.elementDtype)throw new Error(`Invalid data types; op elements ${t}, but list elements ${this.elementDtype}`);if(0===this.size())throw new Error("Trying to pop from an empty list.");const n=og(this.elementShape,this.tensors,e),r=this.tensors.pop();return r.kept=!1,ag(r.shape,e,"TensorList shape mismatch: "),li(r,n)}pushBack(e){if(e.dtype!==this.elementDtype)throw new Error(`Invalid data types; op elements ${e.dtype}, but list elements ${this.elementDtype}`);if(ag(e.shape,this.elementShape,"TensorList shape mismatch: "),this.maxNumElements===this.size())throw new Error("Trying to push element into a full list.");xs(e),this.tensors.push(e)}resize(e){if(e<0)throw new Error(`TensorListResize expects size to be non-negative. Got: ${e}`);if(-1!==this.maxNumElements&&e>this.maxNumElements)throw new Error(`TensorListResize input size ${e} is greater maxNumElement ${this.maxNumElements}.`);const t=new lg([],this.elementShape,this.elementDtype,this.maxNumElements);t.tensors.length=e;for(let n=0;n<Math.min(this.tensors.length,e);++n)t.tensors[n]=this.tensors[n];return t}getItem(e,t,n){if(n!==this.elementDtype)throw new Error(`Invalid data types; op elements ${n}, but list elements ${this.elementDtype}`);if(e<0||e>this.tensors.length)throw new Error(`Trying to access element ${e} in a list with ${this.tensors.length} elements.`);if(null==this.tensors[e])throw new Error(`element at index ${e} is null.`);ag(this.tensors[e].shape,t,"TensorList shape mismatch: ");const r=og(this.elementShape,this.tensors,t);return li(this.tensors[e],r)}setItem(e,t){if(t.dtype!==this.elementDtype)throw new Error(`Invalid data types; op elements ${t.dtype}, but list elements ${this.elementDtype}`);if(e<0||-1!==this.maxNumElements&&e>=this.maxNumElements)throw new Error(`Trying to set element ${e} in a list with max ${this.maxNumElements} elements.`);ag(this.elementShape,t.shape,"TensorList shape mismatch: "),xs(t),null!=this.tensors[e]&&(this.tensors[e].kept=!1),this.tensors[e]=t}gather(e,t,n){if(t!==this.elementDtype)throw new Error(`Invalid data types; op elements ${t}, but list elements ${this.elementDtype}`);ag(this.elementShape,n,"TensorList shape mismatch: "),e=e.slice(0,this.size());const r=og(this.elementShape,this.tensors,n);return 0===e.length?is([],[0].concat(r)):bs(()=>{const t=e.map(e=>li(this.tensors[e],r));return Qc(t,0)})}concat(e,t){if(e&&e!==this.elementDtype)throw new Error(`TensorList dtype is ${this.elementDtype} but concat requested dtype ${e}`);ag(this.elementShape,t,"TensorList shape mismatch: ");const n=og(this.elementShape,this.tensors,t);return 0===this.size()?is([],[0].concat(n)):bs(()=>{const e=this.tensors.map(e=>li(e,n));return di(e,0)})}}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
const cg=async(e,t,n)=>{switch(e.op){case"If":case"StatelessIf":{const r=mf("thenBranch",e,t,n),a=mf("elseBranch",e,t,n),s=mf("cond",e,t,n),o=mf("args",e,t,n);return(await s.data())[0]?n.functionMap[r].executeFunctionAsync(o,n.tensorArrayMap,n.tensorListMap):n.functionMap[a].executeFunctionAsync(o,n.tensorArrayMap,n.tensorListMap)}case"While":case"StatelessWhile":{const r=mf("body",e,t,n),a=mf("cond",e,t,n),s=mf("args",e,t,n),o=await n.functionMap[a].executeFunctionAsync(s,n.tensorArrayMap,n.tensorListMap),i=s.map(e=>e.id);let u=await o[0].data();o.forEach(e=>{e.kept||-1!==i.indexOf(e.id)||e.dispose()});let l=s;for(;u[0];){const e=l;l=await n.functionMap[r].executeFunctionAsync(l,n.tensorArrayMap,n.tensorListMap);const t=l.map(e=>e.id);e.forEach(e=>{e.kept||-1!==i.indexOf(e.id)||-1!==t.indexOf(e.id)||e.dispose()});const s=await n.functionMap[a].executeFunctionAsync(l,n.tensorArrayMap,n.tensorListMap);u=await s[0].data(),s.forEach(e=>{e.kept||-1!==i.indexOf(e.id)||-1!==t.indexOf(e.id)||e.dispose()})}return l}case"LoopCond":return[Nf(mf("pred",e,t,n))];case"Switch":{const r=mf("pred",e,t,n);let a=mf("data",e,t,n);return a.kept||(a=Nf(a)),(await r.data())[0]?[void 0,a]:[a,void 0]}case"Merge":{const r=e.inputNames.find(e=>void 0!==ff(e,t,n));if(r){return[Nf(ff(r,t,n))]}return}case"Enter":{const r=mf("frameName",e,t,n),a=mf("tensor",e,t,n);return n.enterFrame(r),[Nf(a)]}case"Exit":{const r=mf("tensor",e,t,n);return n.exitFrame(),[Nf(r)]}case"NextIteration":{const r=mf("tensor",e,t,n);return n.nextIteration(),[Nf(r)]}case"TensorArrayV3":{const r=mf("size",e,t,n),a=mf("dtype",e,t,n),s=mf("elementShape",e,t,n),o=mf("dynamicSize",e,t,n),i=mf("clearAfterRead",e,t,n),u=mf("identicalElementShapes",e,t,n),l=mf("name",e,t,n),c=new ug(l,a,r,s,u,o,i);return n.addTensorArray(c),[c.idTensor,xu(1)]}case"TensorArrayWriteV3":{const r=mf("tensorArrayId",e,t,n),a=mf("index",e,t,n),s=mf("tensor",e,t,n),o=n.getTensorArray(r.id);return o.write(a,s),[o.idTensor]}case"TensorArrayReadV3":{const r=mf("tensorArrayId",e,t,n),a=mf("index",e,t,n);return[n.getTensorArray(r.id).read(a)]}case"TensorArrayGatherV3":{const r=mf("tensorArrayId",e,t,n),a=mf("indices",e,t,n),s=mf("dtype",e,t,n);return[n.getTensorArray(r.id).gather(a,s)]}case"TensorArrayScatterV3":{const r=mf("tensorArrayId",e,t,n),a=mf("indices",e,t,n),s=mf("tensor",e,t,n),o=n.getTensorArray(r.id);return o.scatter(a,s),[o.idTensor]}case"TensorArrayConcatV3":{const r=mf("tensorArrayId",e,t,n),a=n.getTensorArray(r.id),s=mf("dtype",e,t,n);return[a.concat(s)]}case"TensorArraySplitV3":{const r=mf("tensorArrayId",e,t,n),a=mf("tensor",e,t,n),s=mf("lengths",e,t,n),o=n.getTensorArray(r.id);return o.split(s,a),[o.idTensor]}case"TensorArraySizeV3":{const r=mf("tensorArrayId",e,t,n);return[xu(n.getTensorArray(r.id).size(),"int32")]}case"TensorArrayCloseV3":{const r=mf("tensorArrayId",e,t,n),a=n.getTensorArray(r.id);return a.clearAndClose(),[a.idTensor]}case"TensorListSetItem":{const r=mf("tensorListId",e,t,n),a=mf("index",e,t,n),s=mf("tensor",e,t,n),o=n.getTensorList(r.id);return o.setItem(a,s),[o.idTensor]}case"TensorListGetItem":{const r=mf("tensorListId",e,t,n),a=mf("index",e,t,n),s=mf("elementShape",e,t,n),o=mf("elementDType",e,t,n);return[n.getTensorList(r.id).getItem(a,s,o)]}case"TensorListScatterV2":case"TensorListScatter":{const r=mf("indices",e,t,n),a=function(e,t,n,r){if(t.length!==e.shape[0])throw new Error(`Expected len(indices) == tensor.shape[0], but saw: ${t.length} vs. ${e.shape[0]}`);const a=Math.max(...t);if(null!=r&&-1!==r&&a>=r)throw new Error(`Max index must be < array size (${a}  vs. ${r})`);const s=new lg([],n,e.dtype,r),o=bp(e,0);return t.forEach((e,t)=>{s.setItem(e,o[t])}),s}(mf("tensor",e,t,n),r,mf("elementShape",e,t,n),mf("numElements",e,t,n));return n.addTensorList(a),[a.idTensor]}case"TensorListReserve":case"EmptyTensorList":{const r=mf("elementShape",e,t,n),a=mf("elementDType",e,t,n);let s;s="TensorListReserve"===e.op?"numElements":"maxNumElements";const o=mf(s,e,t,n),i=function(e,t,n,r){return new lg([],e,t,r)}(r,a,0,"TensorListReserve"===e.op?-1:o);return n.addTensorList(i),[i.idTensor]}case"TensorListGather":{const r=mf("tensorListId",e,t,n),a=mf("indices",e,t,n),s=mf("elementShape",e,t,n),o=mf("elementDType",e,t,n);return[n.getTensorList(r.id).gather(a,o,s)]}case"TensorListStack":{const r=mf("tensorListId",e,t,n),a=mf("elementShape",e,t,n),s=mf("elementDType",e,t,n),o=mf("numElements",e,t,n);return[n.getTensorList(r.id).stack(a,s,o)]}case"TensorListFromTensor":{const r=function(e,t,n){const r=e.dtype;if(e.shape.length<1)throw new Error(`Tensor must be at least a vector, but saw shape: ${e.shape}`);if(e.dtype!==n)throw new Error(`Invalid data types; op elements ${e.dtype}, but list elements ${n}`);ag(e.shape.slice(1),t,"TensorList shape mismatch: ");const a=bp(e);return new lg(a,t,r)}(mf("tensor",e,t,n),mf("elementShape",e,t,n),mf("elementDType",e,t,n));return n.addTensorList(r),[r.idTensor]}case"TensorListConcat":case"TensorListConcatV2":{const r=mf("tensorListId",e,t,n),a=n.getTensorList(r.id),s=mf("dtype",e,t,n),o=mf("elementShape",e,t,n);return[a.concat(s,o)]}case"TensorListPushBack":{const r=mf("tensorListId",e,t,n),a=mf("tensor",e,t,n),s=n.getTensorList(r.id);return s.pushBack(a),[s.idTensor]}case"TensorListPopBack":{const r=mf("tensorListId",e,t,n),a=mf("elementShape",e,t,n),s=mf("elementDType",e,t,n);return[n.getTensorList(r.id).popBack(a,s)]}case"TensorListSplit":{const r=mf("tensor",e,t,n),a=mf("elementShape",e,t,n),s=function(e,t,n){let r=0;const a=t.map(e=>(r+=e,r));if(r!==e.shape[0])throw new Error(`Expected sum of lengths to be equal to\n          tensor.shape[0], but sum of lengths is\n        ${r}, and tensor's shape is: ${e.shape}`);const s=ig(e.shape.slice(1),n),o=0===r?0:e.size/r,i=bs(()=>{const n=[];e=li(e,[1,r,o]);for(let r=0;r<t.length;++r){const i=[0,0===r?0:a[r-1],0],u=[1,t[r],o];n[r]=li(fi(e,i,u),s)}return e.dispose(),n}),u=new lg([],n,e.dtype,t.length);for(let l=0;l<i.length;l++)u.setItem(l,i[l]);return u}(r,mf("lengths",e,t,n),a);return n.addTensorList(s),[s.idTensor]}case"TensorListLength":{const r=mf("tensorListId",e,t,n);return[xu(n.getTensorList(r.id).size(),"int32")]}case"TensorListResize":{const r=mf("tensorListId",e,t,n),a=mf("size",e,t,n),s=n.getTensorList(r.id).resize(a);return n.addTensorList(s),[s.idTensor]}default:throw TypeError(`Node type ${e.op} is not implemented`)}};
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function pg(e,t,n){const[r,a]=mf("fusedOps",e,t,n),s="biasadd"===r,o=!s,i="prelu"===a,u="fusedbatchnorm"===r,l=mf("numArgs",e,t,n);if(s){if(i&&2!==l)throw new Error("FusedConv2d and DepthwiseConv2d with BiasAdd and Prelu must have two extra arguments: bias and alpha.");if(!i&&s&&1!==l)throw new Error("FusedConv2d and DepthwiseConv2d with BiasAdd must have one extra argument: bias.")}if(u)throw new Error("FusedConv2d and DepthwiseConv2d with FusedBatchNorm is not supported");const c=mf("strides",e,t,n),p=xf(e,t,n),d=mf("dataFormat",e,t,n).toUpperCase(),h=mf("dilations",e,t,n);let[m,f]=mf("args",e,t,n);o&&(f=m,m=void 0);return{stride:c,pad:p,dataFormat:d,dilations:h,biasArg:m,preluArg:f,activationFunc:a,leakyreluAlpha:mf("leakyreluAlpha",e,t,n)}}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function dg(e,t,n){return{boxes:mf("boxes",e,t,n),scores:mf("scores",e,t,n),maxOutputSize:mf("maxOutputSize",e,t,n),iouThreshold:mf("iouThreshold",e,t,n),scoreThreshold:mf("scoreThreshold",e,t,n),softNmsSigma:mf("softNmsSigma",e,t,n)}}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
class hg{get id(){return this.handle.id}constructor(e,t){this.keyDType=e,this.valueDType=t,this.handle=xu(0),this.tensorMap=new Map,xs(this.handle)}clearAndClose(){this.tensorMap.forEach(e=>e.dispose()),this.tensorMap.clear(),this.handle.dispose()}size(){return this.tensorMap.size}tensorSize(){return xu(this.size(),"int32")}async import(e,t){this.checkKeyAndValueTensor(e,t);const n=await e.data();return this.tensorMap.forEach(e=>e.dispose()),this.tensorMap.clear(),bs(()=>{const e=bp(t),r=n.length,a=e.length;p(r===a,()=>`The number of elements doesn't match, keys has ${r} elements, the values has ${a} elements.`);for(let t=0;t<r;t++){const r=n[t],a=e[t];xs(a),this.tensorMap.set(r,a)}return this.handle})}async find(e,t){this.checkKeyAndValueTensor(e,t);const n=await e.data();return bs(()=>{const e=[];for(let r=0;r<n.length;r++){const a=n[r],s=this.findWithDefault(a,t);e.push(s)}return Qc(e)})}findWithDefault(e,t){const n=this.tensorMap.get(e);return null!=n?n:t}checkKeyAndValueTensor(e,t){if(e.dtype!==this.keyDType)throw new Error(`Expect key dtype ${this.keyDType}, but got ${e.dtype}`);if(t.dtype!==this.valueDType)throw new Error(`Expect value dtype ${this.valueDType}, but got ${t.dtype}`)}}
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
function mg(e,t,n,r,a=bs){const s=((e,t,n)=>{switch(e.category){case"arithmetic":return a(()=>((e,t,n,r=rg)=>{switch(e.op){case"BiasAdd":case"AddV2":case"Add":return[r.add(mf("a",e,t,n),mf("b",e,t,n))];case"AddN":return[r.addN(mf("tensors",e,t,n))];case"FloorMod":case"Mod":return[r.mod(mf("a",e,t,n),mf("b",e,t,n))];case"Mul":return[r.mul(mf("a",e,t,n),mf("b",e,t,n))];case"RealDiv":case"Div":return[r.div(mf("a",e,t,n),mf("b",e,t,n))];case"DivNoNan":return[r.divNoNan(mf("a",e,t,n),mf("b",e,t,n))];case"FloorDiv":return[r.floorDiv(mf("a",e,t,n),mf("b",e,t,n))];case"Sub":return[r.sub(mf("a",e,t,n),mf("b",e,t,n))];case"Minimum":return[r.minimum(mf("a",e,t,n),mf("b",e,t,n))];case"Maximum":return[r.maximum(mf("a",e,t,n),mf("b",e,t,n))];case"Pow":return[r.pow(mf("a",e,t,n),mf("b",e,t,n))];case"SquaredDifference":return[r.squaredDifference(mf("a",e,t,n),mf("b",e,t,n))];default:throw TypeError(`Node type ${e.op} is not implemented`)}})(e,t,n));case"basic_math":return a(()=>((e,t,n,r=rg)=>{switch(e.op){case"Abs":case"ComplexAbs":return[r.abs(mf("x",e,t,n))];case"Acos":return[r.acos(mf("x",e,t,n))];case"Acosh":return[r.acosh(mf("x",e,t,n))];case"Asin":return[r.asin(mf("x",e,t,n))];case"Asinh":return[r.asinh(mf("x",e,t,n))];case"Atan":return[r.atan(mf("x",e,t,n))];case"Atan2":return[r.atan2(mf("x",e,t,n),mf("y",e,t,n))];case"Atanh":return[r.atanh(mf("x",e,t,n))];case"Ceil":return[r.ceil(mf("x",e,t,n))];case"Complex":return[r.complex(mf("real",e,t,n),mf("imag",e,t,n))];case"Cos":return[r.cos(mf("x",e,t,n))];case"Cosh":return[r.cosh(mf("x",e,t,n))];case"Elu":return[r.elu(mf("x",e,t,n))];case"Erf":return[r.erf(mf("x",e,t,n))];case"Exp":return[r.exp(mf("x",e,t,n))];case"Expm1":return[r.expm1(mf("x",e,t,n))];case"Floor":return[r.floor(mf("x",e,t,n))];case"Log":return[r.log(mf("x",e,t,n))];case"Log1p":return[r.log1p(mf("x",e,t,n))];case"Imag":return[r.imag(mf("x",e,t,n))];case"Neg":return[r.neg(mf("x",e,t,n))];case"Reciprocal":return[r.reciprocal(mf("x",e,t,n))];case"Real":return[r.real(mf("x",e,t,n))];case"Relu":return[r.relu(mf("x",e,t,n))];case"Round":return[r.round(mf("x",e,t,n))];case"Selu":return[r.selu(mf("x",e,t,n))];case"Sigmoid":return[r.sigmoid(mf("x",e,t,n))];case"Sin":return[r.sin(mf("x",e,t,n))];case"Sign":return[r.sign(mf("x",e,t,n))];case"Sinh":return[r.sinh(mf("x",e,t,n))];case"Softplus":return[r.softplus(mf("x",e,t,n))];case"Sqrt":return[r.sqrt(mf("x",e,t,n))];case"Square":return[r.square(mf("x",e,t,n))];case"Tanh":return[r.tanh(mf("x",e,t,n))];case"Tan":return[r.tan(mf("x",e,t,n))];case"ClipByValue":return[r.clipByValue(mf("x",e,t,n),mf("clipValueMin",e,t,n),mf("clipValueMax",e,t,n))];case"Relu6":return[r.relu6(mf("x",e,t,n))];case"Rsqrt":return[r.rsqrt(ff(e.inputNames[0],t,n))];case"LeakyRelu":return[r.leakyRelu(mf("x",e,t,n),mf("alpha",e,t,n))];case"Prelu":return[r.prelu(mf("x",e,t,n),mf("alpha",e,t,n))];case"IsNan":return[r.isNaN(ff(e.inputNames[0],t,n))];case"IsInf":return[r.isInf(ff(e.inputNames[0],t,n))];case"IsFinite":return[r.isFinite(ff(e.inputNames[0],t,n))];default:throw TypeError(`Node type ${e.op} is not implemented`)}})(e,t,n));case"control":return cg(e,t,n);case"convolution":return a(()=>((e,t,n,r=rg)=>{switch(e.op){case"Conv1D":{const a=mf("stride",e,t,n),s=mf("pad",e,t,n),o=mf("dataFormat",e,t,n).toUpperCase(),i=mf("dilation",e,t,n);return[r.conv1d(mf("x",e,t,n),mf("filter",e,t,n),a,s,o,i)]}case"Conv2D":{const a=mf("strides",e,t,n),s=xf(e,t,n),o=mf("dataFormat",e,t,n).toUpperCase(),i=mf("dilations",e,t,n);return[r.conv2d(mf("x",e,t,n),mf("filter",e,t,n),[a[1],a[2]],s,o,[i[1],i[2]])]}case"_FusedConv2D":{const{stride:a,pad:s,dataFormat:o,dilations:i,biasArg:u,preluArg:l,activationFunc:c,leakyreluAlpha:p}=pg(e,t,n);return[r.fused.conv2d({x:mf("x",e,t,n),filter:mf("filter",e,t,n),strides:[a[1],a[2]],pad:s,dataFormat:o,dilations:[i[1],i[2]],bias:u,activation:c,preluActivationWeights:l,leakyreluAlpha:p})]}case"FusedDepthwiseConv2dNative":{const{stride:a,pad:s,dataFormat:o,dilations:i,biasArg:u,preluArg:l,activationFunc:c,leakyreluAlpha:p}=pg(e,t,n);return[r.fused.depthwiseConv2d({x:mf("x",e,t,n),filter:mf("filter",e,t,n),strides:[a[1],a[2]],pad:s,dataFormat:o,dilations:[i[1],i[2]],bias:u,activation:c,preluActivationWeights:l,leakyreluAlpha:p})]}case"Conv2DBackpropInput":case"Conv2dTranspose":{const a=mf("outputShape",e,t,n),s=mf("strides",e,t,n),o=xf(e,t,n);return[r.conv2dTranspose(mf("x",e,t,n),mf("filter",e,t,n),a,[s[1],s[2]],o)]}case"DepthwiseConv2dNative":case"DepthwiseConv2d":{const a=mf("strides",e,t,n),s=xf(e,t,n),o=mf("dilations",e,t,n),i=mf("dataFormat",e,t,n).toUpperCase();return[r.depthwiseConv2d(mf("input",e,t,n),mf("filter",e,t,n),[a[1],a[2]],s,i,[o[1],o[2]])]}case"Conv3D":{const a=mf("strides",e,t,n),s=mf("pad",e,t,n),o=mf("dataFormat",e,t,n).toUpperCase(),i=mf("dilations",e,t,n);return[r.conv3d(mf("x",e,t,n),mf("filter",e,t,n),[a[1],a[2],a[3]],s,o,[i[1],i[2],i[3]])]}case"AvgPool":{const a=mf("strides",e,t,n),s=mf("pad",e,t,n),o=mf("kernelSize",e,t,n);return[r.avgPool(mf("x",e,t,n),[o[1],o[2]],[a[1],a[2]],s)]}case"MaxPool":{const a=mf("strides",e,t,n),s=mf("pad",e,t,n),o=mf("kernelSize",e,t,n);return[r.maxPool(mf("x",e,t,n),[o[1],o[2]],[a[1],a[2]],s)]}case"MaxPoolWithArgmax":{const a=mf("strides",e,t,n),s=mf("pad",e,t,n),o=mf("kernelSize",e,t,n),i=mf("includeBatchInIndex",e,t,n),{result:u,indexes:l}=r.maxPoolWithArgmax(mf("x",e,t,n),[o[1],o[2]],[a[1],a[2]],s,i);return[u,l]}case"AvgPool3D":{const a=mf("strides",e,t,n),s=mf("pad",e,t,n),o=mf("kernelSize",e,t,n);return[r.avgPool3d(mf("x",e,t,n),[o[1],o[2],o[3]],[a[1],a[2],a[3]],s)]}case"MaxPool3D":{const a=mf("strides",e,t,n),s=mf("pad",e,t,n),o=mf("kernelSize",e,t,n);return[r.maxPool3d(mf("x",e,t,n),[o[1],o[2],o[3]],[a[1],a[2],a[3]],s)]}case"Dilation2D":{const a=mf("strides",e,t,n),s=mf("pad",e,t,n),o=mf("dilations",e,t,n),i=a[1],u=a[2],l=o[1],c=o[2];return[r.dilation2d(mf("x",e,t,n),mf("filter",e,t,n),[i,u],s,[l,c],"NHWC")]}default:throw TypeError(`Node type ${e.op} is not implemented`)}})(e,t,n));case"creation":return a(()=>((e,t,n,r=rg)=>{switch(e.op){case"Fill":{const a=mf("shape",e,t,n),s=mf("dtype",e,t,n),o=mf("value",e,t,n);return[r.fill(a,o,s)]}case"LinSpace":{const a=mf("start",e,t,n),s=mf("stop",e,t,n),o=mf("num",e,t,n);return[r.linspace(a,s,o)]}case"Multinomial":{const a=mf("logits",e,t,n),s=mf("numSamples",e,t,n),o=mf("seed",e,t,n);return[r.multinomial(a,s,o)]}case"OneHot":{const a=mf("indices",e,t,n),s=mf("depth",e,t,n),o=mf("onValue",e,t,n),i=mf("offValue",e,t,n),u=mf("dtype",e,t,n);return[r.oneHot(a,s,o,i,u)]}case"Ones":return[r.ones(mf("shape",e,t,n),mf("dtype",e,t,n))];case"OnesLike":return[r.onesLike(mf("x",e,t,n))];case"RandomStandardNormal":return[r.randomStandardNormal(mf("shape",e,t,n),mf("dtype",e,t,n),mf("seed",e,t,n))];case"RandomUniform":return[r.randomUniform(mf("shape",e,t,n),mf("minval",e,t,n),mf("maxval",e,t,n),mf("dtype",e,t,n))];case"RandomUniformInt":return[r.randomUniformInt(mf("shape",e,t,n),mf("minval",e,t,n),mf("maxval",e,t,n),mf("seed",e,t,n))];case"Range":{const a=mf("start",e,t,n),s=mf("stop",e,t,n),o=mf("step",e,t,n);return[r.range(a,s,o,mf("dtype",e,t,n))]}case"TruncatedNormal":{const a=mf("shape",e,t,n),s=mf("mean",e,t,n),o=mf("stdDev",e,t,n),i=mf("seed",e,t,n);return[r.truncatedNormal(a,s,o,mf("dtype",e,t,n),i)]}case"Zeros":return[r.zeros(mf("shape",e,t,n),mf("dtype",e,t,n))];case"ZerosLike":return[r.zerosLike(mf("x",e,t,n))];default:throw TypeError(`Node type ${e.op} is not implemented`)}})(e,t,n));case"dynamic":return(async(e,t,n,r,a=rg)=>{switch(e.op){case"NonMaxSuppressionV5":{const{boxes:r,scores:s,maxOutputSize:o,iouThreshold:i,scoreThreshold:u,softNmsSigma:l}=dg(e,t,n),c=await a.image.nonMaxSuppressionWithScoreAsync(r,s,o,i,u,l);return[c.selectedIndices,c.selectedScores]}case"NonMaxSuppressionV4":{const{boxes:r,scores:s,maxOutputSize:o,iouThreshold:i,scoreThreshold:u}=dg(e,t,n),l=mf("padToMaxOutputSize",e,t,n),c=await a.image.nonMaxSuppressionPaddedAsync(r,s,o,i,u,l);return[c.selectedIndices,c.validOutputs]}case"NonMaxSuppressionV3":case"NonMaxSuppressionV2":{const{boxes:r,scores:s,maxOutputSize:o,iouThreshold:i,scoreThreshold:u}=dg(e,t,n);return[await a.image.nonMaxSuppressionAsync(r,s,o,i,u)]}case"Where":{const r=a.cast(mf("condition",e,t,n),"bool"),s=[await a.whereAsync(r)];return r.dispose(),s}case"ListDiff":return a.setdiff1dAsync(mf("x",e,t,n),mf("y",e,t,n));default:throw TypeError(`Node type ${e.op} is not implemented`)}})(e,t,n);case"evaluation":return a(()=>((e,t,n,r=rg)=>{switch(e.op){case"LowerBound":{const a=mf("sortedSequence",e,t,n),s=mf("values",e,t,n);return[r.lowerBound(a,s)]}case"TopKV2":{const a=mf("x",e,t,n),s=mf("k",e,t,n),o=mf("sorted",e,t,n),i=r.topk(a,s,o);return[i.values,i.indices]}case"UpperBound":{const a=mf("sortedSequence",e,t,n),s=mf("values",e,t,n);return[r.upperBound(a,s)]}case"Unique":{const a=mf("x",e,t,n),s=r.unique(a);return[s.values,s.indices]}case"UniqueV2":{const a=mf("x",e,t,n),s=mf("axis",e,t,n),o=r.unique(a,s);return[o.values,o.indices]}default:throw TypeError(`Node type ${e.op} is not implemented`)}})(e,t,n));case"image":return a(()=>((e,t,n,r=rg)=>{switch(e.op){case"ResizeBilinear":{const a=mf("images",e,t,n),s=mf("size",e,t,n),o=mf("alignCorners",e,t,n),i=mf("halfPixelCenters",e,t,n);return[r.image.resizeBilinear(a,[s[0],s[1]],o,i)]}case"ResizeNearestNeighbor":{const a=mf("images",e,t,n),s=mf("size",e,t,n),o=mf("alignCorners",e,t,n),i=mf("halfPixelCenters",e,t,n);return[r.image.resizeNearestNeighbor(a,[s[0],s[1]],o,i)]}case"CropAndResize":{const a=mf("image",e,t,n),s=mf("boxes",e,t,n),o=mf("boxInd",e,t,n),i=mf("cropSize",e,t,n),u=mf("method",e,t,n),l=mf("extrapolationValue",e,t,n);return[r.image.cropAndResize(a,s,o,i,u,l)]}case"ImageProjectiveTransformV3":{const a=mf("images",e,t,n),s=mf("transforms",e,t,n),o=mf("outputShape",e,t,n),i=mf("fillValue",e,t,n),u=mf("interpolation",e,t,n),l=mf("fillMode",e,t,n);return[r.image.transform(a,s,u.toLowerCase(),l.toLowerCase(),i,o)]}default:throw TypeError(`Node type ${e.op} is not implemented`)}})(e,t,n));case"graph":return a(()=>((e,t,n,r=rg)=>{switch(e.op){case"Const":return t[e.name];case"PlaceholderWithDefault":const a=mf("default",e,t,n);return[ff(e.name,t,n)||a];case"Placeholder":return[ff(e.name,t,n)];case"Identity":case"StopGradient":case"FakeQuantWithMinMaxVars":case"Snapshot":return[Nf(mf("x",e,t,n))];case"IdentityN":return mf("x",e,t,n).map(e=>Nf(e));case"Shape":return[r.tensor1d(mf("x",e,t,n).shape,"int32")];case"ShapeN":return mf("x",e,t,n).map(e=>r.tensor1d(e.shape));case"Size":return[r.scalar(mf("x",e,t,n).size,"int32")];case"Rank":return[r.scalar(mf("x",e,t,n).rank,"int32")];case"NoOp":return[r.scalar(1)];case"Print":const s=mf("x",e,t,n),o=mf("data",e,t,n);mf("message",e,t,n),mf("summarize",e,t,n);for(let e=0;e<o.length;e++);return[s];default:throw TypeError(`Node type ${e.op} is not implemented`)}})(e,t,n));case"logical":return a(()=>((e,t,n,r=rg)=>{switch(e.op){case"Equal":return[r.equal(mf("a",e,t,n),mf("b",e,t,n))];case"NotEqual":return[r.notEqual(mf("a",e,t,n),mf("b",e,t,n))];case"Greater":return[r.greater(mf("a",e,t,n),mf("b",e,t,n))];case"GreaterEqual":return[r.greaterEqual(mf("a",e,t,n),mf("b",e,t,n))];case"Less":return[r.less(mf("a",e,t,n),mf("b",e,t,n))];case"LessEqual":return[r.lessEqual(mf("a",e,t,n),mf("b",e,t,n))];case"LogicalAnd":return[r.logicalAnd(mf("a",e,t,n),mf("b",e,t,n))];case"LogicalNot":return[r.logicalNot(mf("a",e,t,n))];case"LogicalOr":return[r.logicalOr(mf("a",e,t,n),mf("b",e,t,n))];case"Select":case"SelectV2":return[r.where(mf("condition",e,t,n),mf("a",e,t,n),mf("b",e,t,n))];case"BitwiseAnd":return[r.bitwiseAnd(mf("a",e,t,n),mf("b",e,t,n))];default:throw TypeError(`Node type ${e.op} is not implemented`)}})(e,t,n));case"matrices":return a(()=>((e,t,n,r=rg)=>{switch(e.op){case"BatchMatMul":case"BatchMatMulV2":case"MatMul":return[r.matMul(mf("a",e,t,n),mf("b",e,t,n),mf("transposeA",e,t,n),mf("transposeB",e,t,n))];case"Einsum":return[r.einsum(mf("equation",e,t,n),...mf("tensors",e,t,n))];case"Transpose":return[r.transpose(mf("x",e,t,n),mf("perm",e,t,n))];case"_FusedMatMul":const[a,s]=mf("fusedOps",e,t,n),o="biasadd"===a,i="prelu"===s,u=mf("numArgs",e,t,n),l=mf("leakyreluAlpha",e,t,n);if(o){if(i&&2!==u)throw new Error("Fused MatMul with BiasAdd and Prelu must have two extra arguments: bias and alpha.");if(!i&&1!==u)throw new Error("Fused MatMul with BiasAdd must have one extra argument: bias.")}const[c,p]=mf("args",e,t,n);return[r.fused.matMul({a:mf("a",e,t,n),b:mf("b",e,t,n),transposeA:mf("transposeA",e,t,n),transposeB:mf("transposeB",e,t,n),bias:c,activation:s,preluActivationWeights:p,leakyreluAlpha:l})];case"MatrixBandPart":return[r.linalg.bandPart(mf("a",e,t,n),mf("numLower",e,t,n),mf("numUpper",e,t,n))];default:throw TypeError(`Node type ${e.op} is not implemented`)}})(e,t,n));case"normalization":return a(()=>((e,t,n,r=rg)=>{switch(e.op){case"EuclideanNorm":return[r.euclideanNorm(mf("x",e,t,n),mf("axis",e,t,n),mf("keepDims",e,t,n))];case"FusedBatchNorm":case"FusedBatchNormV2":case"FusedBatchNormV3":return[r.batchNorm(mf("x",e,t,n),mf("mean",e,t,n),mf("variance",e,t,n),mf("offset",e,t,n),mf("scale",e,t,n),mf("epsilon",e,t,n))];case"LRN":return[r.localResponseNormalization(mf("x",e,t,n),mf("radius",e,t,n),mf("bias",e,t,n),mf("alpha",e,t,n),mf("beta",e,t,n))];case"Softmax":return[r.softmax(mf("x",e,t,n))];case"LogSoftmax":return[r.logSoftmax(mf("x",e,t,n))];default:throw TypeError(`Node type ${e.op} is not implemented`)}})(e,t,n));case"ragged":return a(()=>((e,t,n,r=rg)=>{switch(e.op){case"RaggedGather":{const{outputNestedSplits:a,outputDenseValues:s}=r.raggedGather(mf("paramsNestedSplits",e,t,n),mf("paramsDenseValues",e,t,n),mf("indices",e,t,n),mf("outputRaggedRank",e,t,n));return a.concat(s)}case"RaggedRange":{const{rtNestedSplits:a,rtDenseValues:s}=r.raggedRange(mf("starts",e,t,n),mf("limits",e,t,n),mf("splits",e,t,n));return[a,s]}case"RaggedTensorToTensor":return[r.raggedTensorToTensor(mf("shape",e,t,n),mf("values",e,t,n),mf("defaultValue",e,t,n),mf("rowPartitionTensors",e,t,n),mf("rowPartitionTypes",e,t,n))];default:throw TypeError(`Node type ${e.op} is not implemented`)}})(e,t,n));case"reduction":return a(()=>((e,t,n,r=rg)=>{switch(e.op){case"Max":{const a=mf("axis",e,t,n),s=mf("keepDims",e,t,n);return[r.max(mf("x",e,t,n),a,s)]}case"Mean":{const a=mf("axis",e,t,n),s=mf("keepDims",e,t,n);return[r.mean(mf("x",e,t,n),a,s)]}case"Min":{const a=mf("axis",e,t,n),s=mf("keepDims",e,t,n);return[r.min(mf("x",e,t,n),a,s)]}case"Sum":{const a=mf("axis",e,t,n),s=mf("keepDims",e,t,n);return[r.sum(mf("x",e,t,n),a,s)]}case"All":{const a=mf("axis",e,t,n),s=mf("keepDims",e,t,n);return[r.all(mf("x",e,t,n),a,s)]}case"Any":{const a=mf("axis",e,t,n),s=mf("keepDims",e,t,n);return[r.any(mf("x",e,t,n),a,s)]}case"ArgMax":{const a=mf("axis",e,t,n);return[r.argMax(mf("x",e,t,n),a)]}case"ArgMin":{const a=mf("axis",e,t,n);return[r.argMin(mf("x",e,t,n),a)]}case"Prod":{const a=mf("axis",e,t,n),s=mf("keepDims",e,t,n);return[r.prod(mf("x",e,t,n),a,s)]}case"Cumprod":{const a=mf("axis",e,t,n),s=mf("exclusive",e,t,n),o=mf("reverse",e,t,n);return[r.cumprod(mf("x",e,t,n),a,s,o)]}case"Cumsum":{const a=mf("axis",e,t,n),s=mf("exclusive",e,t,n),o=mf("reverse",e,t,n);return[r.cumsum(mf("x",e,t,n),a,s,o)]}case"Bincount":const a=mf("x",e,t,n),s=mf("weights",e,t,n),o=mf("size",e,t,n);return[r.bincount(a,s,o)];case"DenseBincount":{const a=mf("x",e,t,n),s=mf("weights",e,t,n),o=mf("size",e,t,n),i=mf("binaryOutput",e,t,n);return[r.denseBincount(a,s,o,i)]}default:throw TypeError(`Node type ${e.op} is not implemented`)}})(e,t,n));case"slice_join":return a(()=>((e,t,n,r=rg)=>{switch(e.op){case"ConcatV2":case"Concat":{const a=mf("n",e,t,n),s=mf("axis",e,t,n);let o=mf("tensors",e,t,n);return o=o.slice(0,a),[r.concat(o,s)]}case"Gather":{const a=mf("x",e,t,n),s=mf("indices",e,t,n);return[r.gather(a,r.cast(s,"int32"),0)]}case"GatherV2":{const a=mf("axis",e,t,n),s=mf("batchDims",e,t,n),o=mf("x",e,t,n),i=mf("indices",e,t,n);return[r.gather(o,r.cast(i,"int32"),a,s)]}case"Reverse":{const a=mf("dims",e,t,n),s=[];for(let e=0;e<a.length;e++)a[e]&&s.push(e);const o=mf("x",e,t,n);return[r.reverse(o,s)]}case"ReverseV2":{const a=mf("axis",e,t,n),s=mf("x",e,t,n);return[r.reverse(s,a)]}case"Slice":{const a=mf("begin",e,t,n),s=mf("size",e,t,n);return[r.slice(mf("x",e,t,n),a,s)]}case"StridedSlice":{const a=mf("begin",e,t,n),s=mf("end",e,t,n),o=mf("strides",e,t,n),i=mf("beginMask",e,t,n),u=mf("endMask",e,t,n),l=mf("ellipsisMask",e,t,n),c=mf("newAxisMask",e,t,n),p=mf("shrinkAxisMask",e,t,n),d=mf("x",e,t,n);return[r.stridedSlice(d,a,s,o,i,u,l,c,p)]}case"Pack":return bs(()=>{const a=mf("axis",e,t,n),s=mf("tensors",e,t,n),o=s[0].shape,i=r.squeeze(s[0]).shape,u=s.map(e=>{const t=g(e.shape,o);if(!t&&!g(r.squeeze(e).shape,i))throw new Error("the input tensors shape does not match");return t?e:r.reshape(e,o)});return[r.stack(u,a)]});case"Unpack":{const a=mf("axis",e,t,n),s=mf("tensor",e,t,n);return r.unstack(s,a)}case"Tile":{const a=mf("reps",e,t,n);return[r.tile(mf("x",e,t,n),a)]}case"Split":case"SplitV":{const a=mf("axis",e,t,n),s=mf("numOrSizeSplits",e,t,n),o=mf("x",e,t,n);return r.split(o,s,a)}case"ScatterNd":{const a=mf("indices",e,t,n),s=mf("values",e,t,n),o=mf("shape",e,t,n);return[r.scatterND(a,s,o)]}case"GatherNd":{const a=mf("x",e,t,n),s=mf("indices",e,t,n);return[r.gatherND(a,s)]}case"SparseToDense":{const a=mf("sparseIndices",e,t,n),s=mf("outputShape",e,t,n),o=mf("sparseValues",e,t,n),i=mf("defaultValue",e,t,n);return[r.sparseToDense(a,o,s,o.dtype===i.dtype?i:r.cast(i,o.dtype))]}case"TensorScatterUpdate":{const a=mf("indices",e,t,n),s=mf("values",e,t,n),o=mf("tensor",e,t,n);return[r.tensorScatterUpdate(o,a,s)]}default:throw TypeError(`Node type ${e.op} is not implemented`)}})(e,t,n));case"sparse":return a(()=>((e,t,n,r=rg)=>{switch(e.op){case"SparseFillEmptyRows":{const{outputIndices:a,outputValues:s,emptyRowIndicator:o,reverseIndexMap:i}=r.sparse.sparseFillEmptyRows(mf("indices",e,t,n),mf("values",e,t,n),mf("denseShape",e,t,n),mf("defaultValue",e,t,n));return[a,s,o,i]}case"SparseReshape":{const{outputIndices:a,outputShape:s}=r.sparse.sparseReshape(mf("inputIndices",e,t,n),mf("inputShape",e,t,n),mf("newShape",e,t,n));return[a,s]}case"SparseSegmentMean":return[r.sparse.sparseSegmentMean(mf("data",e,t,n),mf("indices",e,t,n),mf("segmentIds",e,t,n))];case"SparseSegmentSum":return[r.sparse.sparseSegmentSum(mf("data",e,t,n),mf("indices",e,t,n),mf("segmentIds",e,t,n))];default:throw TypeError(`Node type ${e.op} is not implemented`)}})(e,t,n));case"spectral":return a(()=>((e,t,n,r=rg)=>{switch(e.op){case"FFT":return[r.fft(mf("x",e,t,n))];case"IFFT":return[r.ifft(mf("x",e,t,n))];case"RFFT":return[r.rfft(mf("x",e,t,n))];case"IRFFT":return[r.irfft(mf("x",e,t,n))];default:throw TypeError(`Node type ${e.op} is not implemented`)}})(e,t,n));case"string":return a(()=>((e,t,n,r=rg)=>{switch(e.op){case"StaticRegexReplace":return[r.string.staticRegexReplace(mf("input",e,t,n),mf("pattern",e,t,n),mf("rewrite",e,t,n),mf("replaceGlobal",e,t,n))];case"StringNGrams":{const{nGrams:a,nGramsSplits:s}=r.string.stringNGrams(mf("data",e,t,n),mf("dataSplits",e,t,n),mf("separator",e,t,n),mf("nGramWidths",e,t,n),mf("leftPad",e,t,n),mf("rightPad",e,t,n),mf("padWidth",e,t,n),mf("preserveShortSequences",e,t,n));return[a,s]}case"StringSplit":{const{indices:a,values:s,shape:o}=r.string.stringSplit(mf("input",e,t,n),mf("delimiter",e,t,n),mf("skipEmpty",e,t,n));return[a,s,o]}case"StringToHashBucketFast":return[r.string.stringToHashBucketFast(mf("input",e,t,n),mf("numBuckets",e,t,n))];default:throw TypeError(`Node type ${e.op} is not implemented`)}})(e,t,n));case"transformation":return a(()=>((e,t,n,r=rg)=>{switch(e.op){case"Cast":return[r.cast(mf("x",e,t,n),mf("dtype",e,t,n))];case"ExpandDims":{const a=mf("axis",e,t,n);return[r.expandDims(mf("x",e,t,n),a)]}case"Squeeze":{const a=mf("axis",e,t,n);return[r.squeeze(mf("x",e,t,n),a)]}case"Reshape":return[r.reshape(mf("x",e,t,n),mf("shape",e,t,n))];case"EnsureShape":return[r.ensureShape(mf("x",e,t,n),mf("shape",e,t,n))];case"MirrorPad":return[r.mirrorPad(mf("x",e,t,n),mf("padding",e,t,n),mf("mode",e,t,n))];case"PadV2":case"Pad":return[r.pad(mf("x",e,t,n),mf("padding",e,t,n),mf("constantValue",e,t,n))];case"SpaceToBatchND":{const a=mf("blockShape",e,t,n),s=mf("paddings",e,t,n);return[r.spaceToBatchND(mf("x",e,t,n),a,s)]}case"BatchToSpaceND":{const a=mf("blockShape",e,t,n),s=mf("crops",e,t,n);return[r.batchToSpaceND(mf("x",e,t,n),a,s)]}case"DepthToSpace":{const a=mf("blockSize",e,t,n),s=mf("dataFormat",e,t,n).toUpperCase();return[r.depthToSpace(mf("x",e,t,n),a,s)]}case"BroadcastTo":return[r.broadcastTo(mf("x",e,t,n),mf("shape",e,t,n))];case"BroadcastArgs":return[r.broadcastArgs(mf("s0",e,t,n),mf("s1",e,t,n))];default:throw TypeError(`Node type ${e.op} is not implemented`)}})(e,t,n));case"hash_table":return(async(e,t,n,r)=>{switch(e.op){case"HashTable":case"HashTableV2":{const a=r.getHashTableHandleByName(e.name);if(null!=a)return[a];{const a=mf("keyDType",e,t,n),s=mf("valueDType",e,t,n),o=new hg(a,s);return r.addHashTable(e.name,o),[o.handle]}}case"InitializeTable":case"InitializeTableV2":case"LookupTableImport":case"LookupTableImportV2":{const a=mf("tableHandle",e,t,n,r),s=mf("keys",e,t,n),o=mf("values",e,t,n),i=r.getHashTableById(a.id);return[await i.import(s,o)]}case"LookupTableFind":case"LookupTableFindV2":{const a=mf("tableHandle",e,t,n,r),s=mf("keys",e,t,n),o=mf("defaultValue",e,t,n),i=r.getHashTableById(a.id);return[await i.find(s,o)]}case"LookupTableSize":case"LookupTableSizeV2":{const a=mf("tableHandle",e,t,n,r);return[r.getHashTableById(a.id).tensorSize()]}default:throw TypeError(`Node type ${e.op} is not implemented`)}})(e,t,n,r);case"custom":const s=df(e.op);if(s&&s.customExecutor)return s.customExecutor(new ng(e,t,n));throw TypeError(`Custom op ${e.op} is not registered.`);default:throw TypeError(`Unknown op '${e.op}'. File an issue at https://github.com/tensorflow/tfjs/issues so we can add it, or register a custom execution with tf.registerOp()`)}})(e,t,n);return K(s)?s.then(e=>[].concat(e)):[].concat(s)}class fg{constructor(e={},t={},n={},r={},a){this.weightMap=e,this.tensorArrayMap=t,this.tensorListMap=n,this.functionMap=r,this.parseNodeNameCache=a,this.rootContext={id:0,frameName:"",iterationId:0},this.contexts=[this.rootContext],this.lastId=0,this.generateCurrentContextIds()}newFrame(e,t){return{id:e,frameName:t,iterationId:0}}set currentContext(e){this.contexts!==e&&(this.contexts=e,this.generateCurrentContextIds())}get currentContext(){return this.contexts}get currentContextId(){return this._currentContextIds[0]}get currentContextIds(){return this._currentContextIds}generateCurrentContextIds(){const e=[];for(let t=0;t<this.contexts.length-1;t++){const n=this.contexts.slice(0,this.contexts.length-t);e.push(this.contextIdforContexts(n))}e.push(""),this._currentContextIds=e}contextIdforContexts(e){return e?e.map(e=>0===e.id&&0===e.iterationId?"":`${e.frameName}-${e.iterationId}`).join("/"):""}enterFrame(e){this.contexts&&(this.lastId++,this.contexts=this.contexts.slice(),this.contexts.push(this.newFrame(this.lastId,e)),this._currentContextIds.unshift(this.contextIdforContexts(this.contexts)))}exitFrame(){if(!(this.contexts&&this.contexts.length>1))throw new Error("Cannot exit frame, the context is empty");this.contexts=this.contexts.slice(),this.contexts.splice(-1),this.currentContextIds.shift()}nextIteration(){if(!(this.contexts&&this.contexts.length>0))throw new Error("Cannot increase frame iteration, the context is empty");{this.contexts=this.contexts.slice(),this.lastId++;const e=Object.assign({},this.contexts[this.contexts.length-1]);e.iterationId+=1,e.id=this.lastId,this.contexts.splice(-1,1,e),this._currentContextIds.splice(0,1,this.contextIdforContexts(this.contexts))}}getWeight(e){return this.weightMap[e]}addTensorArray(e){this.tensorArrayMap[e.id]=e}getTensorArray(e){return this.tensorArrayMap[e]}addTensorList(e){this.tensorListMap[e.id]=e}getTensorList(e){return this.tensorListMap[e]}dispose(e){for(const t in this.tensorArrayMap)this.tensorArrayMap[t].clearAndClose(e);for(const t in this.tensorListMap)this.tensorListMap[t].clearAndClose(e)}}
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function gg(e,t,n,r){const a=new Set,s=[];let o=null,i=null;const u=new Set,l=new Set(Object.keys(e).map(e=>wf(e)[0]));r=r||[];const c=new Set(r.map(e=>wf(e.name)[0])),p=[...t];for(;p.length>0;){const e=p.pop();(Sg(e)||vg(e)||Tg(e))&&null==o&&(o=e,i=o.children.map(e=>e.name).filter(e=>a.has(e))),a.add(e.name),null==n[e.name]&&(l.has(e.name)||c.has(e.name)||(0!==e.inputs.length?e.inputs.forEach(e=>{u.has(e.name)||(u.add(e.name),p.push(e))}):s.push(e.name)))}return{inputs:e,outputs:t,usedNodes:a,missingInputs:s,dynamicNode:o,syncInputs:i}}function yg(e,t){const{usedNodes:n,inputs:r}=t,a=Object.keys(r).map(e=>wf(e)[0]).map(t=>e.nodes[t]),s=e.initNodes||[],o=e=>n.has("string"==typeof e?e:e.name);function i(e){return[...new Map(e.map(e=>[e.name,e])).values()]}const u=i([...a,...e.weights,...s]).filter(o),l=i([...u,...Object.values(e.nodes)]).filter(o),c=new Map(l.map(e=>[e.name,e])),p={};for(const f of l){p[f.name]=p[f.name]||0;for(const e of f.children)o(e)||(p[e.name]=Number.POSITIVE_INFINITY),p[e.name]=(p[e.name]||0)+1}const d=Object.entries(p).filter(([,e])=>0===e).map(([e])=>e),h=[...d];for(;d.length>0;){const e=d.pop(),t=c.get(e);for(const n of t.children.filter(o))0===--p[n.name]&&(h.push(n.name),d.push(n.name))}const m=function(e,t){const n=new Map(e.map(e=>[e.name,e])),r=t.map(e=>e.name),a=new Set(r);for(;r.length>0;){const e=r.pop(),t=n.get(e);for(const s of t.children)n.has(s.name)&&!a.has(s.name)&&(a.add(s.name),r.push(s.name))}const s=e.filter(e=>a.has(e.name));return s}(h.map(e=>c.get(e)),u);return function(e,t){const n=new Map(e.map((e,t)=>[e.name,t])),r=new Set(t.map(e=>e.name)),a=e=>r.has("string"==typeof e?e:e.name),s=new Set(e.map(e=>e.name)),o=e=>s.has("string"==typeof e?e:e.name);for(const i of e){for(const e of i.children.filter(o)){if(!n.has(e.name))throw new bg(`Child ${e.name} of node ${i.name} is unreachable.`);if(n.get(i.name)>n.get(e.name))throw new bg(`Node ${i.name} is scheduled to run after its child ${e.name}.`)}if(!a(i))for(const e of i.inputs){if(!n.has(e.name))throw new bg(`Input ${e.name} of node ${i.name} is unreachable.`);if(n.get(e.name)>n.get(i.name))throw new bg(`Node ${i.name} is scheduled to run before its input ${e.name}.`)}}}(m,u),m}class bg extends Error{constructor(e){super(`NodesExecutionOrderError: ${e}`)}}const wg=new Set(["Switch","Merge","Enter","Exit","NextIteration","StatelessIf","StatelessWhile","if","While"]),xg=new Set(["NonMaxSuppressionV2","NonMaxSuppressionV3","NonMaxSuppressionV5","Where"]),Ng=new Set(["HashTable","HashTableV2","LookupTableImport","LookupTableImportV2","LookupTableFind","LookupTableFindV2","LookupTableSize","LookupTableSizeV2"]);function Sg(e){return wg.has(e.op)}function vg(e){return xg.has(e.op)}function Tg(e){return Ng.has(e.op)}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class kg{get weightIds(){return this.parent?this.parent.weightIds:this._weightIds}get functionExecutorMap(){return this.parent?this.parent.functionExecutorMap:this._functionExecutorMap}get weightMap(){return this.parent?this.parent.weightMap:this._weightMap}set weightMap(e){const t=Object.keys(e).map(t=>e[t].map(e=>e.id));this._weightIds=[].concat(...t),this._weightMap=e}set resourceManager(e){this._resourceManager=e}get inputs(){return this._inputs.map(e=>({name:e.name,shape:e.attrParams.shape?e.attrParams.shape.value:void 0,dtype:e.attrParams.dtype?e.attrParams.dtype.value:void 0}))}get outputs(){return this._outputs.map(e=>({name:e.name,shape:e.attrParams.shape?e.attrParams.shape.value:void 0,dtype:e.attrParams.dtype?e.attrParams.dtype.value:void 0}))}get inputNodes(){return this._inputs.map(e=>e.signatureKey||e.name)}get outputNodes(){return this._outputs.map(e=>{const t=e.signatureKey||e.name;return e.defaultOutput?`${t}:${e.defaultOutput}`:t})}get functions(){return Object.keys(this._functions).reduce((e,t)=>(e[t]=this._functions[t].signature,e),{})}constructor(e,t){this.graph=e,this.parent=t,this.compiledMap=new Map,this.parseNodeNameCache=new Map,this._weightMap={},this.SEPARATOR=",",this._functions={},this._functionExecutorMap={},this.keepIntermediateTensors=!1,this._outputs=e.outputs,this._inputs=e.inputs,this._initNodes=e.initNodes,this._signature=e.signature,this._functions=e.functions,null!=e.functions&&Object.keys(e.functions).forEach(t=>{this._functionExecutorMap[t]=new kg(e.functions[t],this)})}getCompilationKey(e,t){const n=e.map(e=>e.name).sort(),r=t.map(e=>e.name).sort();return n.join(this.SEPARATOR)+"--"+r.join(this.SEPARATOR)}compile(e,t){const n=gg(e,t,this.weightMap,this._initNodes),{missingInputs:r,dynamicNode:a,syncInputs:s}=n;if(null!=a)throw new Error(`This execution contains the node '${a.name}', which has the dynamic op '${a.op}'. Please use model.executeAsync() instead. Alternatively, to avoid the dynamic ops, specify the inputs [${s}]`);if(r.length>0){const n=t.map(e=>e.name),a=Object.keys(e);throw new Error(`Cannot compute the outputs [${n}] from the provided inputs [${a}]. Missing the following inputs: [${r}]`)}const o=yg(this.graph,n),i=function(e){const t=new Map(e.map((e,t)=>[e.name,t])),n=Number.MAX_SAFE_INTEGER,r=e.map((e,t)=>Sg(e)?n:t),a=e=>{const n=r[t.get(e.name)];return null==n?-1:n},s=e.map((e,t)=>e.children.map(a).reduce((e,t)=>Math.max(e,t),r[t])),o=new Map;for(let i=0;i<e.length;++i){const t=s[i];if(t===n)continue;const r=e[i],a=e[t];o.has(a.name)||o.set(a.name,[]),o.get(a.name).push(r)}return o}(o);return{orderedNodes:o,nodeLiveUntilMap:i}}cloneAndKeepTensor(e){if(null==e)return null;const t=e.clone();return xs(t),t}cloneTensorList(e){if(!e)return null;return e.map(e=>this.cloneAndKeepTensor(e))}cloneTensorMap(e){return Object.fromEntries(Object.entries(e).map(([e,t])=>[e,this.cloneTensorList(t)]))}execute(e,t){this.disposeIntermediateTensors(),e=this.mapInputs(e);const n=Object.keys(e).sort();this.checkInputs(e),this.checkInputShapeAndType(e),t=this.mapOutputs(t),this.checkOutputs(t);const r=n.map(e=>this.graph.nodes[wf(e)[0]]),a=t.map(e=>wf(e)[0]),s=new Set(a);let o=a.map(e=>this.graph.nodes[e]);0===o.length&&(o=this._outputs);const i=this.getCompilationKey(r,o);let u=this.compiledMap.get(i);null==u&&(u=this.compile(e,o),this.compiledMap.set(i,u));try{this.keepIntermediateTensors=X().getBool("KEEP_INTERMEDIATE_TENSORS")}catch(p){this.keepIntermediateTensors=!1}const l={},c={};return bs(()=>{const n=new fg(this.weightMap,l,c,this.functionExecutorMap,this.parseNodeNameCache),r=Object.assign({},this.weightMap);this.keepIntermediateTensors&&(this.clonedTensorsMap=this.cloneTensorMap(this.weightMap)),Object.keys(e).forEach(t=>{const[a,s]=wf(t,n),o=[];o[s]=e[t],r[a]=o,this.keepIntermediateTensors&&(this.clonedTensorsMap[a]=this.cloneTensorList(o))});const a=this.getFrozenTensorIds(r),{orderedNodes:o,nodeLiveUntilMap:i}=u;for(const e of o){if(r[e.name])continue;const t=mg(e,r,n,this._resourceManager);if(K(t))throw new Error(`The execution of the op '${e.op}' returned a promise. Please use model.executeAsync() instead.`);r[e.name]=t,this.keepIntermediateTensors&&(this.clonedTensorsMap[e.name]=this.cloneTensorList(t)),this.checkTensorForDisposalWithNodeLiveUntilInfo(e,r,n,a,s,i.get(e.name))}return null==this.parent&&n.dispose(a),t.map(e=>ff(e,r,n))})}getFrozenTensorIds(e){const t=[].concat.apply([],Object.keys(e).map(t=>e[t]).map(e=>e.map(e=>e.id)));return new Set(t)}checkTensorForDisposal(e,t,n,r,a,s,o){if(!Sg(t)&&!s.has(e)){for(const r of n[e])null!=r&&(o[r.id]=(o[r.id]||0)+t.children.length);for(const e of t.inputs){if(Sg(e))continue;const t=gf(e.name,n,r);if(null!=t)for(const e of t){if(!e||e.kept||a.has(e.id))continue;const t=o[e.id];1===t?(e.dispose(),delete o[e.id]):null!=t&&o[e.id]--}}}}checkTensorForDisposalWithNodeLiveUntilInfo(e,t,n,r,a,s){function o(e){return Sg(e)||a.has(e.name)}if(!Sg(e)&&null!=s)for(const i of s){if(o(i))continue;const e=gf(i.name,t,n);for(const t of e)!t||t.kept||r.has(t.id)||t.dispose()}}async executeAsync(e,t){return this._executeAsync(e,t)}disposeIntermediateTensors(){this.clonedTensorsMap&&(Object.values(this.clonedTensorsMap).forEach(e=>{for(const t of e)t&&!t.isDisposed&&t.dispose()}),this.clonedTensorsMap=null)}getIntermediateTensors(){return this.clonedTensorsMap}async _executeAsync(e,t,n=!1,r={},a={}){this.disposeIntermediateTensors(),n||(e=this.mapInputs(e),this.checkInputs(e),this.checkInputShapeAndType(e),t=this.mapOutputs(t),this.checkOutputs(t));try{this.keepIntermediateTensors=X().getBool("KEEP_INTERMEDIATE_TENSORS")}catch(p){this.keepIntermediateTensors=!1}const s=new fg(this.weightMap,r,a,this.functionExecutorMap,this.parseNodeNameCache);this.keepIntermediateTensors&&(this.clonedTensorsMap=this.cloneTensorMap(this.weightMap));const o=await this.executeWithControlFlow(e,s,t,n),i=t.map(e=>ff(e,o,s)),u=i.map(e=>e.id),l=Object.keys(e).map(t=>e[t].id),c=new Set([...u,...l,...this.weightIds]);return Object.values(o).forEach(e=>{e.forEach(e=>{!e||e.isDisposed||c.has(e.id)||e.dispose()})}),null==this.parent&&s.dispose(c),i}async executeFunctionAsync(e,t,n){const r=e.reduce((e,t,n)=>(e[this.inputs[n].name]=t,e),{});return this._executeAsync(r,this.outputNodes,!0,t,n)}async executeWithControlFlow(e,t,n,r){const a=Object.keys(e),s=a.map(e=>this.graph.nodes[wf(e)[0]]),o=n.map(e=>wf(e)[0]),i=new Set(o);let u=o.map(e=>this.graph.nodes[e]);0===u.length&&(u=this._outputs);const{usedNodes:l,missingInputs:c,dynamicNode:p,syncInputs:d}=gg(e,u,this.weightMap,this._initNodes),h=[...s,...this.graph.weights,...this._initNodes||[]].map(e=>({node:e,contexts:t.currentContext})),m=Object.assign({},this.weightMap);Object.keys(e).forEach(t=>{const[n,r]=wf(t),a=[];a[r]=e[t],m[n]=a});const f={},g=this.getFrozenTensorIds(m),y={};for(;h.length>0;){const e=this.processStack(s,h,t,m,y,g,i,f,l);await Promise.all(e)}const b=u.filter(e=>!Sg(e)&&!ff(e.name,m,t)).map(e=>e.name);if(b.length>0){let e="";throw null!=p&&(e=`Alternatively, to avoid the dynamic ops, use model.execute() and specify the inputs [${d}]`),new Error(`Cannot compute the outputs [${b}] from the provided inputs [${a}]. Consider providing the following inputs: [${c}]. ${e}`)}return m}processStack(e,t,n,r,a,s,o,i,u){const l=[];for(;t.length>0;){const e=t.pop();n.currentContext=e.contexts;let c="";if("Enter"===e.node.op&&mf("isConstant",e.node,r,n)&&([c]=yf(e.node.name,n)),null==r[e.node.name]){const p=mg(e.node,r,n,this._resourceManager);c||([c]=yf(e.node.name,n));const d=n.currentContext;K(p)?l.push(p.then(l=>(r[c]=l,this.keepIntermediateTensors&&(this.clonedTensorsMap[c]=this.cloneTensorList(l)),n.currentContext=d,this.checkTensorForDisposal(c,e.node,r,n,s,o,i),this.processChildNodes(e.node,t,n,r,a,u),l))):(r[c]=p,this.keepIntermediateTensors&&(this.clonedTensorsMap[c]=this.cloneTensorList(p)),this.checkTensorForDisposal(c,e.node,r,n,s,o,i),this.processChildNodes(e.node,t,n,r,a,u))}else this.processChildNodes(e.node,t,n,r,a,u)}return l}processChildNodes(e,t,n,r,a,s){e.children.forEach(e=>{const[o]=yf(e.name,n);!a[o]&&s.has(e.name)&&("Merge"===e.op?e.inputNames.some(e=>!!ff(e,r,n))&&(a[o]=!0,t.push({contexts:n.currentContext,node:e})):e.inputNames.every(e=>!!ff(e,r,n))&&(a[o]=!0,t.push({contexts:n.currentContext,node:e})))})}dispose(){Object.keys(this.weightMap).forEach(e=>this.weightMap[e].forEach(e=>e.dispose()))}checkInputShapeAndType(e){Object.keys(e).forEach(t=>{const n=e[t],[r]=wf(t),a=this.graph.nodes[r];if(a.attrParams.shape&&a.attrParams.shape.value){const e=a.attrParams.shape.value;p(e.length===n.shape.length&&n.shape.every((t,n)=>-1===e[n]||e[n]===t),()=>`The shape of dict['${a.name}'] provided in model.execute(dict) must be [${e}], but was [${n.shape}]`)}a.attrParams.dtype&&a.attrParams.dtype.value&&p(n.dtype===a.attrParams.dtype.value,()=>`The dtype of dict['${a.name}'] provided in model.execute(dict) must be ${a.attrParams.dtype.value}, but was ${n.dtype}`)})}mapInputs(e){var t,n;const r={};for(const a in e){const s=null===(n=null===(t=this._signature)||void 0===t?void 0:t.inputs)||void 0===n?void 0:n[a];null!=s?r[s.name]=e[a]:r[a]=e[a]}return r}checkInputs(e){const t=Object.keys(e).filter(e=>{const[t]=wf(e);return null==this.graph.nodes[t]});if(t.length>0)throw new Error(`The dict provided in model.execute(dict) has keys: [${t}] that are not part of graph`)}mapOutputs(e){return e.map(e=>{var t,n;const r=null===(n=null===(t=this._signature)||void 0===t?void 0:t.outputs)||void 0===n?void 0:n[e];return null!=r?r.name:e},{})}checkOutputs(e){e.forEach(e=>{const[t]=wf(e);if(!this.graph.nodes[t])throw new Error(`The output '${e}' is not found in the graph`)})}}class Eg{constructor(e={},t={}){this.hashTableNameToHandle=e,this.hashTableMap=t}addHashTable(e,t){this.hashTableNameToHandle[e]=t.handle,this.hashTableMap[t.id]=t}getHashTableHandleByName(e){return this.hashTableNameToHandle[e]}getHashTableById(e){return this.hashTableMap[e]}dispose(){for(const e in this.hashTableMap)this.hashTableMap[e].clearAndClose(),delete this.hashTableMap[e];for(const e in this.hashTableNameToHandle)this.hashTableNameToHandle[e].dispose(),delete this.hashTableNameToHandle[e]}}
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const _g="?tfjs-format=file",Ig="model.json";class Ag{get modelVersion(){return this.version}get inputNodes(){return this.executor.inputNodes}get outputNodes(){return this.executor.outputNodes}get inputs(){return this.executor.inputs}get outputs(){return this.executor.outputs}get weights(){return this.executor.weightMap}get metadata(){return this.artifacts.userDefinedMetadata}get modelSignature(){return this.signature}get modelStructuredOutputKeys(){return this.structuredOutputKeys}constructor(e,t={},n=bh){this.modelUrl=e,this.loadOptions=t,this.version="n/a",this.io=n,null==t&&(this.loadOptions={}),this.resourceManager=new Eg}findIOHandler(){const e=this.modelUrl;if(null!=e.load)this.handler=e;else if(null!=this.loadOptions.requestInit)this.handler=this.io.browserHTTPRequest(e,this.loadOptions);else{const t=this.io.getLoadHandlers(e,this.loadOptions);if(0===t.length)t.push(this.io.browserHTTPRequest(e,this.loadOptions));else if(t.length>1)throw new Error(`Found more than one (${t.length}) load handlers for URL '${[e]}'`);this.handler=t[0]}}load(){if(this.findIOHandler(),null==this.handler.load)throw new Error("Cannot proceed with model loading because the IOHandler provided does not have the `load` method implemented.");const e=this.handler.load();return K(e)?e.then(e=>null==e.getWeightStream?this.loadSync(e):this.loadStreaming(e)):this.loadSync(e)}loadSync(e){const t=this.io.decodeWeights(e.weightData,e.weightSpecs);return this.loadWithWeightMap(e,t)}async loadStreaming(e){if(null==e.getWeightStream)throw new Error("Model artifacts missing streamWeights function");const t=await Bs(e.getWeightStream(),e.weightSpecs);return this.loadWithWeightMap(e,t)}loadWithWeightMap(e,t){this.artifacts=e;const n=this.artifacts.modelTopology;let r=this.artifacts.signature;if(null!=this.artifacts.userDefinedMetadata){const e=this.artifacts.userDefinedMetadata;null!=e.signature&&(r=e.signature),null!=e.structuredOutputKeys&&(this.structuredOutputKeys=e.structuredOutputKeys)}if(this.signature=r,this.version=`${n.versions.producer}.${n.versions.minConsumer}`,this.executor=new kg(Vf.Instance.transformGraph(n,this.signature)),this.executor.weightMap=this.convertTensorMapToTensorsMap(t),this.executor.resourceManager=this.resourceManager,null!=e.modelInitializer&&null!=e.modelInitializer.node){const t=Vf.Instance.transformGraph(e.modelInitializer);this.initializer=new kg(t),this.initializer.weightMap=this.executor.weightMap,this.initializer.resourceManager=this.resourceManager,this.initializerSignature=e.initializerSignature}return!0}async save(e,t){if("string"==typeof e){const t=this.io.getSaveHandlers(e);if(0===t.length)throw new Error(`Cannot find any save handlers for URL '${e}'`);if(t.length>1)throw new Error(`Found more than one (${t.length}) save handlers for URL '${e}'`);e=t[0]}if(null==e.save)throw new Error("GraphModel.save() cannot proceed because the IOHandler provided does not have the `save` attribute defined.");return e.save(this.artifacts)}addStructuredOutputNames(e){if(this.structuredOutputKeys){const t={};return(e instanceof ya?[e]:e).forEach((e,n)=>t[this.structuredOutputKeys[n]]=e),t}return e}predict(e,t){const n=this.execute(e,this.outputNodes);return this.addStructuredOutputNames(n)}async predictAsync(e,t){const n=await this.executeAsync(e,this.outputNodes);return this.addStructuredOutputNames(n)}normalizeInputs(e){var t;if(!(e instanceof ya||Array.isArray(e))){const n=null===(t=this.signature)||void 0===t?void 0:t.inputs;if(null!=n)for(const t in n){const r=n[t];null!=r.resourceId&&(e[t]=this.resourceIdToCapturedInput[r.resourceId])}return e}e=Array.isArray(e)?e:[e];const n=Object.keys(this.resourceIdToCapturedInput).length;if(e.length+n!==this.inputNodes.length)throw new Error(`Input tensor count mismatch, the graph model has ${this.inputNodes.length-n} non-resource placeholders, while there are ${e.length} input tensors provided.`);let r=0;return this.inputNodes.reduce((t,n)=>{var a,s,o;const i=null===(o=null===(s=null===(a=this.signature)||void 0===a?void 0:a.inputs)||void 0===s?void 0:s[n])||void 0===o?void 0:o.resourceId;return t[n]=null!=i?this.resourceIdToCapturedInput[i]:e[r++],t},{})}normalizeOutputs(e){return e=e||this.outputNodes,Array.isArray(e)?e:[e]}executeInitializerGraph(){return null==this.initializer?[]:null==this.initializerSignature?this.initializer.execute({},[]):this.initializer.execute({},Object.keys(this.initializerSignature.outputs))}async executeInitializerGraphAsync(){return null==this.initializer?[]:null==this.initializerSignature?this.initializer.executeAsync({},[]):this.initializer.executeAsync({},Object.keys(this.initializerSignature.outputs))}setResourceIdToCapturedInput(e){if(this.resourceIdToCapturedInput={},this.initializerSignature){const t=this.initializerSignature.outputs,n=Object.keys(t);for(let r=0;r<n.length;r++){const a=t[n[r]];this.resourceIdToCapturedInput[a.resourceId]=e[r]}}}execute(e,t){null==this.resourceIdToCapturedInput&&this.setResourceIdToCapturedInput(this.executeInitializerGraph()),e=this.normalizeInputs(e),t=this.normalizeOutputs(t);const n=this.executor.execute(e,t);return n.length>1?n:n[0]}async executeAsync(e,t){null==this.resourceIdToCapturedInput&&this.setResourceIdToCapturedInput(await this.executeInitializerGraphAsync()),e=this.normalizeInputs(e),t=this.normalizeOutputs(t);const n=await this.executor.executeAsync(e,t);return n.length>1?n:n[0]}getIntermediateTensors(){return this.executor.getIntermediateTensors()}disposeIntermediateTensors(){this.executor.disposeIntermediateTensors()}convertTensorMapToTensorsMap(e){return Object.keys(e).reduce((t,n)=>(t[n]=[e[n]],t),{})}dispose(){this.executor.dispose(),this.initializer&&(this.initializer.dispose(),this.resourceIdToCapturedInput&&ws(this.resourceIdToCapturedInput)),this.resourceManager.dispose()}}async function Mg(e,t={},n=bh){if(null==e)throw new Error("modelUrl in loadGraphModel() cannot be null. Please provide a url or an IOHandler that loads the model");null==t&&(t={}),t.fromTFHub&&"string"==typeof e&&(e=function(e){e.endsWith("/")||(e+="/");return`${e}${Ig}${_g}`}(e));const r=new Ag(e,t,n);return await r.load(),r}function $g(e){if(null==e)throw new Error("modelUrl in loadGraphModelSync() cannot be null. Please provide model artifacts or an IOHandler that loads the model");let t;if(e instanceof Array){const[n,r]=e;if(!n)throw new Error("modelJSON must be the first element of the array");if(!(r&&r instanceof ArrayBuffer))throw new Error("An ArrayBuffer of weights must be the second element of the array");if(!("modelTopology"in n))throw new Error("Model JSON is missing 'modelTopology'");if(!("weightsManifest"in n))throw new Error("Model JSON is missing 'weightsManifest'");t=yh(Ws(n,Ks(n.weightsManifest),r))}else if("load"in e)t=e;else{if(!("modelTopology"in e&&"weightSpecs"in e&&"weightData"in e))throw new Error("Unknown model format");t=yh(e)}const n=new Ag(t);return n.load(),n}export{Ie as $,ne as A,oe as B,le as C,nu as D,ce as E,pe as F,de as G,fe as H,he as I,me as J,as as K,ts as L,p as M,ui as N,Ga as O,we as P,be as Q,ye as R,ge as S,ya as T,xe as U,hi as V,Ne as W,Fl as X,Te as Y,Ee as Z,_e as _,bs as a,Pt as a$,tu as a0,ol as a1,Cu as a2,Uu as a3,Me as a4,$e as a5,S as a6,Zc as a7,Oe as a8,ai as a9,st as aA,ot as aB,it as aC,pt as aD,dt as aE,ht as aF,Rc as aG,Mu as aH,mt as aI,Qc as aJ,yp as aK,fu as aL,yt as aM,bt as aN,Nt as aO,St as aP,vt as aQ,Tt as aR,Ru as aS,At as aT,It as aU,Rt as aV,Bt as aW,Ft as aX,du as aY,eu as aZ,Lt as a_,Dp as aa,Fi as ab,Re as ac,Ri as ad,Fe as ae,Ce as af,Li as ag,ze as ah,Lc as ai,Le as aj,Pc as ak,Ve as al,mu as am,Wi as an,Tp as ao,Ge as ap,si as aq,Lp as ar,Pp as as,Ze as at,Xe as au,Je as av,tt as aw,nt as ax,rt as ay,_u as az,$o as b,Jn as b$,Vu as b0,Wt as b1,jt as b2,Ut as b3,Vt as b4,qt as b5,pu as b6,m as b7,wl as b8,Kt as b9,En as bA,Ic as bB,_n as bC,In as bD,On as bE,il as bF,Dn as bG,dm as bH,hm as bI,zn as bJ,Bn as bK,Cn as bL,Vi as bM,Fn as bN,Ui as bO,Rn as bP,Uh as bQ,$l as bR,Wn as bS,Ln as bT,mi as bU,Un as bV,bi as bW,jn as bX,di as bY,Pn as bZ,Xn as b_,Ht as ba,Zt as bb,Jt as bc,Ou as bd,Yt as be,Qt as bf,sn as bg,an as bh,on as bi,bp as bj,un as bk,cn as bl,Gu as bm,wu as bn,pn as bo,dn as bp,ji as bq,Qe as br,bn as bs,kn as bt,wn as bu,xn as bv,vn as bw,Tn as bx,Nn as by,Sn as bz,Io as c,Sl as c$,fr as c0,rr as c1,Vn as c2,ar as c3,sr as c4,or as c5,lr as c6,pr as c7,dr as c8,gl as c9,Zi as cA,ru as cB,au as cC,ou as cD,uu as cE,Eu as cF,Au as cG,qc as cH,Oo as cI,Kc as cJ,Hc as cK,Bu as cL,zu as cM,Lu as cN,Pu as cO,Wu as cP,nl as cQ,al as cR,sl as cS,qu as cT,ul as cU,ll as cV,hl as cW,yu as cX,yl as cY,bu as cZ,Nl as c_,Du as ca,Iu as cb,mr as cc,Ir as cd,ba as ce,Co as cf,Fo as cg,Bo as ch,Lo as ci,Po as cj,Vo as ck,Uo as cl,jo as cm,Wo as cn,Go as co,qo as cp,Ko as cq,ci as cr,wi as cs,Ei as ct,_i as cu,Ai as cv,Ci as cw,Bi as cx,qi as cy,Ki as cz,fi as d,Js as d$,vl as d0,ku as d1,_l as d2,Il as d3,Al as d4,Bl as d5,zl as d6,Ll as d7,kc as d8,Ec as d9,Oi as dA,$i as dB,Mi as dC,Ap as dD,$u as dE,Bd as dF,Nc as dG,fp as dH,jd as dI,Wd as dJ,Gd as dK,xp as dL,g as dM,ws as dN,X as dO,Jh as dP,D as dQ,xs as dR,Ii as dS,Hh as dT,Ao as dU,Kd as dV,o as dW,gs as dX,Zs as dY,$s as dZ,Vs as d_,_c as da,fd as db,gd as dc,Jc as dd,Dc as de,Cc as df,Fc as dg,zc as dh,tl as di,Xc as dj,tp as dk,np as dl,gi as dm,mp as dn,gp as dp,Qr as dq,As as dr,Wc as ds,jc as dt,Uc as du,Vc as dv,wc as dw,Up as dx,rp as dy,Di as dz,Gc as e,Mh as e$,hh as e0,ih as e1,Os as e2,Pi as e3,zp as e4,zi as e5,Tl as e6,xi as e7,Ni as e8,Si as e9,q as eA,G as eB,Ae as eC,U as eD,yn as eE,Yr as eF,I as eG,Qm as eH,ve as eI,k as eJ,at as eK,gt as eL,kt as eM,Et as eN,Xr as eO,en as eP,$a as eQ,gu as eR,nm as eS,rm as eT,Qh as eU,am as eV,tm as eW,ma as eX,Ph as eY,Vh as eZ,ef as e_,ml as ea,pi as eb,is as ec,vc as ed,Gi as ee,K as ef,ra as eg,za as eh,Ba as ei,cc as ej,ap as ek,ea as el,a as em,r as en,fs as eo,Nr as ep,$ as eq,ta as er,xm as es,P as et,na as eu,_o as ev,Np as ew,B as ex,T as ey,Ji as ez,Eh as f,Nm as f$,Bm as f0,zm as f1,Lm as f2,Pm as f3,Vm as f4,Um as f5,jm as f6,Wm as f7,Gm as f8,qm as f9,Yo as fA,Be as fB,Ue as fC,Pe as fD,V as fE,je as fF,We as fG,qe as fH,Ke as fI,He as fJ,Ho as fK,L as fL,j as fM,Ye as fN,et as fO,Mm as fP,Om as fQ,Dm as fR,$m as fS,Rm as fT,wm as fU,bm as fV,ym as fW,gm as fX,fm as fY,mm as fZ,Tm as f_,Km as fa,Hm as fb,Yn as fc,Jr as fd,l as fe,Is as ff,N as fg,br as fh,ie as fi,hu as fj,ue as fk,Zo as fl,Jo as fm,im as fn,um as fo,lm as fp,cm as fq,pm as fr,Se as fs,ke as ft,xt as fu,Xh as fv,Yh as fw,ii as fx,Xo as fy,De as fz,ep as g,c as g$,Sm as g0,vm as g1,Em as g2,km as g3,_m as g4,ut as g5,lt as g6,R as g7,ct as g8,wr as g9,$n as gA,Gn as gB,qn as gC,Kn as gD,Hn as gE,Zn as gF,Fm as gG,Qn as gH,jh as gI,$h as gJ,er as gK,tr as gL,nr as gM,Mn as gN,ir as gO,ur as gP,i as gQ,cr as gR,_r as gS,b as gT,u as gU,v as gV,w as gW,Ha as gX,tf as gY,x as gZ,aa as g_,xr as ga,ft as gb,Ih as gc,Xm as gd,wt as ge,_t as gf,Mt as gg,$t as gh,Ot as gi,Gt as gj,Xt as gk,tn as gl,rd as gm,nn as gn,ad as go,rn as gp,sd as gq,d as gr,hn as gs,mn as gt,fn as gu,gn as gv,yr as gw,om as gx,An as gy,pp as gz,re as h,Fu as h$,A as h0,Za as h1,y as h2,sm as h3,Oa as h4,gr as h5,Jm as h6,Zm as h7,qh as h8,Hd as h9,_h as hA,ss as hB,$r as hC,$p as hD,Yu as hE,hs as hF,hf as hG,Ja as hH,Hi as hI,ds as hJ,ms as hK,su as hL,ps as hM,cs as hN,Mp as hO,iu as hP,Es as hQ,_s as hR,jp as hS,Ip as hT,Ah as hU,Ts as hV,kr as hW,Tr as hX,Er as hY,Ku as hZ,Hu as h_,Zd as ha,Jd as hb,Xd as hc,Q as hd,Z as he,Ag as hf,Dt as hg,Ct as hh,zt as hi,Qd as hj,rs as hk,Kh as hl,ln as hm,eh as hn,xa as ho,vd as hp,Yd as hq,hr,wa as hs,zo as ht,yi as hu,vi as hv,Ti as hw,vp as hx,ki as hy,Qi as hz,Fd as i,Ju as i$,Op as i0,bh as i1,nf as i2,ju as i3,$g as i4,zd as i5,dl as i6,xh as i7,fl as i8,xl as i9,Oc as iA,Ep as iB,dp as iC,pl as iD,qd as iE,Ss as iF,Ms as iG,Bc as iH,Cd as iI,Gh as iJ,Ld as iK,_p as iL,Rd as iM,Pd as iN,sp as iO,op as iP,ip as iQ,up as iR,hp as iS,Pa as iT,mc as iU,Ns as iV,Mr as iW,Ar as iX,wp as iY,sa as iZ,Zu as i_,kp as ia,kl as ib,El as ic,Ml as id,Ol as ie,Dl as ig,Rl as ih,Cl as ii,Mo as ij,ys as ik,Pl as il,Vl as im,Ul as io,jl as ip,bc as iq,xc as ir,Sc as is,vs as it,Tc as iu,pf as iv,ks as iw,Ac as ix,Mc as iy,$c as iz,Su as j,Xu as j0,Sp as j1,Nu as k,Mg as l,Ro as m,rl as n,xu as o,el as p,Do as q,li as r,Yc as s,rf as t,ae as u,se as v,Yi as w,Xi as x,vu as y,bl as z};
