
let URL_REFERENCE = /url\(['"]?#(.+)['"]?\)/;

class Id {
	constructor(id) {
		this.id = id;
		this.elements = [];
		this.references = [];
	}

	trackElement(element) {
		this.elements.push(element);
	}

	caputreReference(element, attributeName) {
		this.references.push({ element, attributeName });
	}

	makeUnique() {
		// Set new IDs
		this.elements.forEach((element, index) => {
			let newId = `${index}_${this.id}`;
			element.setAttribute('data-original-id', this.id);
			element.setAttribute('id', newId);
		});

		// Update references
		this.references.forEach(reference => {
			let closest = this.getClosestElement(reference.element);

			if (closest) {
				let newId = closest.getAttribute('id');
				reference.element.setAttribute(reference.attributeName, `url(#${newId})`);
			}
			else {
				console.error(`Failed to locate referenced element in scope for ${reference.element}`);
			}
		});
	}

	getClosestElement(referenceElement) {
		let parent = referenceElement.parentNode;

		// Stop searching if we've reached the SVG node or have no parent for some reason
		if (!parent || referenceElement.nodeName.toLowerCase() === 'svg') {
			return undefined;
		}

		// Return the found node or recurse
		return parent.querySelector(`[data-original-id='${this.id}']`) || this.getClosestElement(parent);
	}

	get elementLength() {
		return this.elements.length;
	}
}

class SvgIds {
	constructor(elementScope) {
		this.elementScope = elementScope || document;
		this.registry = { };

	}

	makeUnique() {
		// Locate SVGs in the document since some browsers won't search inside SVGs unless searching from an SVG
		let searchScope = this.elementScope.querySelectorAll('svg');

		// If no SVGs found in the element scope, assume the element scope is an SVG already and proceed 
		searchScope = searchScope.length ? searchScope : [this.elementScope];

		// Track all IDed elements
		searchScope.forEach((svg, index) => {
			svg.querySelectorAll('[id]').forEach(element => this.registerElement(element));
		});

		// Track all URL references
		searchScope.forEach((svg, index) => {
			svg.querySelectorAll('*').forEach(element => this.caputreReferences(element));
		});

		// Assign new IDs and update references
		this.duplicateIds.forEach(id => id.makeUnique());
	}

	registerElement(element) {
		let idRef = element.getAttribute('id');

		if (!this.registry[idRef]) {
			this.registry[idRef] = new Id(idRef);
		}

		this.registry[idRef].trackElement(element);
	}

	caputreReferences(element) {
		Array.from(element.attributes).forEach(attribute => {
			let match = attribute.value.match(URL_REFERENCE);

			if (match && match.length >= 2) {
				let idRef = match[1];
				this.registry[idRef].caputreReference(element, attribute.name);
			}
		});
	}

	get duplicateIds() {
		return Object.values(this.registry).filter(id => id.elementLength > 1);
	}
}

export default SvgIds;