import {
	ValidatorConstraint,
	ValidatorConstraintInterface,
	registerDecorator,
	ValidationOptions,
	ValidationArguments,
} from "class-validator";

/** Check if the string is a valid {@link https://en.wikipedia.org/wiki/ISO_639-1 ISO 639-1 alpha 2} officially assigned language code */
export const ISO639Alpha2RegExp = new RegExp(
	/^(aa|ab|ae|af|ak|am|an|ar|as|av|ay|az|ba|be|bg|bh|bi|bm|bn|bo|br|bs|ca|ce|ch|co|cr|cs|cu|cv|cy|da|de|dv|dz|ee|el|en|eo|es|et|eu|fa|ff|fi|fj|fo|fr|fy|ga|gd|gl|gn|gu|gv|ha|he|hi|ho|hr|ht|hu|hy|hz|ia|id|ie|ig|ii|ik|io|is|it|iu|ja|jv|ka|kg|ki|kj|kk|kl|km|kn|ko|kr|ks|ku|kv|kw|ky|la|lb|lg|li|ln|lo|lt|lu|lv|mg|mh|mi|mk|ml|mn|mr|ms|mt|my|na|nb|nd|ne|ng|nl|nn|no|nr|nv|ny|oc|oj|om|or|os|pa|pi|pl|ps|pt|qu|rm|rn|ro|ru|rw|sa|sc|sd|se|sg|si|sk|sl|sm|sn|so|sq|sr|ss|st|su|sv|sw|ta|te|tg|th|ti|tk|tl|tn|to|tr|ts|tt|tw|ty|ug|uk|ur|uz|ve|vi|vo|wa|wo|xh|yi|yo|za|zh|zu)$/i
);

@ValidatorConstraint({ name: "isISO639Alpha2", async: false })
export class IsISO639Alpha2Constraint implements ValidatorConstraintInterface {
	validate(text: string) {
		return ISO639Alpha2RegExp.test(text);
	}

	defaultMessage(arguments_: ValidationArguments) {
		arguments_.property;
		return `${arguments_.property} must be a valid ISO639 Alpha2 code`;
	}
}

/** Check if the string is a valid {@link https://en.wikipedia.org/wiki/ISO_639-1 ISO 639-1 alpha 2} officially assigned language code */
export function IsISO639Alpha2(validationOptions?: ValidationOptions) {
	return function (object: unknown, propertyName: string) {
		registerDecorator({
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			constraints: [],
			validator: IsISO639Alpha2Constraint,
		});
	};
}
