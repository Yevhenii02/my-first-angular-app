import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housing-location';
import { HousingService } from '../housing.service';

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [CommonModule, HousingLocationComponent],
	templateUrl: './home.component.html',
	styleUrl: './home.component.css'
})
export class HomeComponent {
	housingService: HousingService = inject(HousingService);
	housingLocationList: HousingLocation[] = [];
	filteredHousingLocationList: HousingLocation[] = [];

	constructor() {
		// this.housingLocationList = this.housingService.getAllHousingLocation();
		this.housingService.getAllHousingLocation().then((housingLocationList: HousingLocation[]) => {
			this.housingLocationList = housingLocationList;
			this.filteredHousingLocationList = housingLocationList;
		});
	}

	filterResults(text: string) {
		if (!text) this.filteredHousingLocationList = this.housingLocationList;

		this.filteredHousingLocationList = this.housingLocationList.filter(housingLocation => {
			return housingLocation?.city.toLowerCase().includes(text.toLowerCase());
		});
	}
}
