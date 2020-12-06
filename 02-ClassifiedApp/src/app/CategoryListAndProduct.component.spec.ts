import { TestBed, inject } from '@angular/core/testing';

import { CategoryListAndProductComponent } from './CategoryListAndProduct.component';

describe('a CategoryListAndProduct component', () => {
	let component: CategoryListAndProductComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				CategoryListAndProductComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([CategoryListAndProductComponent], (CategoryListAndProductComponent) => {
		component = CategoryListAndProductComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});