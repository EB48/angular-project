import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { WorldService } from '../world-bank-api.service';
import { map } from 'rxjs/internal/operators/map';
import { CommonModule } from '@angular/common';

interface Country {
  name:string;
  capitalCity: string;
  region: string;
  incomeLevel: string;
  longitude: string;
  latitude: string;
}

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'

})



export class MapComponent implements AfterViewInit {
  
  constructor(public worldService: WorldService, private cdr: ChangeDetectorRef) {}
  countries: Country[] = [];
  selectedCountry: Country | null = null;



  ngAfterViewInit() {
    const svgObject = document.getElementById('map') as HTMLObjectElement;

    if (svgObject) {
      svgObject.addEventListener('load', () => {
        const svg = svgObject.contentDocument;
        if (svg) {
          const paths = svg.querySelectorAll('path');

          paths.forEach(path => {
            const countryId = path.getAttribute('id');
            path.addEventListener('mouseenter', () => {
              path.setAttribute('fill', 'red');
              if (countryId) {
                this.worldService.getCountryData(countryId).pipe(map(response => {
                  console.log('response:',response);
                  if (Array.isArray(response) && response.length > 1) {
                    const countriesData = response[1] as Array < {
                      name: string,
                      capitalCity: string,
                      region: {id: string; iso2code: string; value: string},
                      incomeLevel: {id: string; iso2code: string; value: string},
                      longitude: string,
                      latitude: string
                    } >;
            
                    if (Array.isArray(countriesData)) {
                      return countriesData.map(country => ({
                        name: country.name,
                        capitalCity: country.capitalCity,
                        region: country.region.value,
                        incomeLevel: country.incomeLevel.value,
                        longitude: country.longitude,
                        latitude: country.latitude 
                      }));
                    }
                    else {
                      throw new Error('Data is not an array');
                    }
                  }
                  else {
                      throw new Error('Response format is incorrect');
                    }
                }))
                .subscribe(
                  data => {
                    this.selectedCountry = data.length > 0 ? data[0]: null;
                    this.cdr.detectChanges();
                  },
                  error => {
                    console.error('Error getting country data', error);
                  }
                );
              }


            });

            path.addEventListener('mouseleave', () => {
              path.removeAttribute('fill');
            });
          });
        }
      });
    }
  }

}
    


