/*
Assumptions made while creating this sheet:
1. We received the Mapping Template file, which had all keys within []. We removed those from the keys of each field.
2. We received the keys of each field, but not the label. Every label defined in this sheet is an assumption of what labels are supposed to be.
3. All fields are marked as TextField, except where we determined with 100% confidence the field is of other type (based on received sample data).
4. MAT Mapping Template file states that gisID should be required if GIS Flags. We need more context on this. Until then, field is marked as NOT required.
*/

import {
    NumberField,
    Sheet,
    TextField,
    Message,
    OptionField,
    ComputedField,
    DateField
} from '@flatfile/configure'

import {SmartDateField} from '../../examples/fields/SmartDateField'
import { countries } from './countries'
const isFuture = require('date-fns/isFuture')



// This is the key of the sheet
export const master_address_sheet = new Sheet(
    // This is the label of the sheet that will be visible in your Flatfile dashboard
    'Master Address',
    {
        // This is the key of the field
        streetNo: NumberField({
            // This is the label of the field that will be visible to a user importing a file.
            label: "Location Street number",
            // This specifies that the field is required.
            required: true
        }),

        streetName: TextField({
            label: "Location Street name",
            description: "Location street name with or without suffix (any suffix will be automatically appended)",
            required: true,
            compute: (v: string) => {
                return v.trim()
            }
        }),

        streetSuffix:  TextField({
            label: "Location Street suffix",
            compute: (v: string) => {
                return v.trim()
            }
        }),

        unit: NumberField({
            label: "Location Unit"
        }),

        city: TextField({
            label: "Location City",
            required: true
        }),

        state: TextField({
            label: "Location State",
            required: true
        }),

        postalCode: NumberField({
            label: "Location Postal code",
            required: true
        }),

        country: OptionField({
            label: "Location Country",
            options: countries
        }),

        gisID: TextField({
            label: "Gis ID"
        }),

        // can use these to compute internal-only fields that you do not expect mapping against
        latitude: ComputedField(
            NumberField({
                label: "Latitude"}),
                {dependsOn: [],
                compute: ({}) => {},
                    destination: "latitude",
            }),
        
        longitude: ComputedField(
            NumberField({
                label: "Longitude"}),
                {dependsOn: [],
                compute: ({}) => {},
                destination: "longitude"
            }),

        yearBuilt: DateField({
            label: "Year built",
            validate: (v) => {
                if (isFuture(new Date(v)) === true) {
                    return [
                        new Message(
                            "Date cannot be in the future, please audit",
                            'error',
                            'validate'
                        ),
                    ]
                }
            }
        }),

        mbl: TextField({
            label: "Mbl",
            required: true
        }),

        subdivision: TextField({
            label: "Subdivision",
        }),

        zoning: TextField({
            label: "Zoning"
        }),

        lotArea: TextField({
            label: "Lot area"
        }),

        bookPage: TextField({
            label: "Book page"
        }),

        water: TextField({
            label: "Water"
        }),

        sewage: OptionField({
            label: "Sewage",
            options:{
                1:{label:"septic"},
                2:{label:"central"},
                3:{label:"local"},
                4:{label:"oneschema"}
            }
        }),

        ownerName: TextField({
            label: "Owner name"
        }),

        ownerStreetAddress: TextField({
            label: "Owner street name or street address",
            compute: (v: string) => {
                return v.trim()
            }
        }),

        ownerStreetSuffix: TextField({
            label: "Owner street suffix",
            compute: (v: string) => {
                return v.trim()
            }
        }),

        ownerStreetNo: TextField({
            label: "Owner street number",
            compute: (v: string) => {
                return v.trim()
            }
        }),

        ownerUnit: TextField({
            label: "Owner unit",
            compute: (v: string) => {
                return v.trim()
            }
        }),

        ownerCity: TextField({
            label: "Owner city"
        }),

        ownerState: TextField({
            label: "Owner state"
        }),

        ownerPostalCode: NumberField({
            label: "Owner postal code"
        }),

        ownerCountry: OptionField({
            label: "Owner country",
            options: countries
        }),

        ownerPhoneNo: TextField({
            label: "Owner phone number"
        }),

        ownerEmail: TextField({
            label: "Owner email"
        }),

        occupancyType: OptionField({
            label: "Occupancy type",
            options: {
                1:{label:"Option 1"},
                2:{label:"Option 2"}
            }
        }),

        buildingType: OptionField({
            label: "Building type",
            options: {
                1:{label:"Option 1"},
                2:{label:"Option 2"}
            }
        }),

        lastUpdatedDate: SmartDateField({
            label: "Last updated date"
        }),

        // what is print_key -> is it an identifier that can be mapped to any of several
        //  "primary keys"?

        matID: TextField({
            label: "Mat ID",
            required: true
        }),

        name: TextField({
            label: "Name"
        }),

        notes: NumberField({
            label: "Notes",
            stageVisibility: {
                mapping: false
            }
        })

    },
    {
        recordCompute: (record) => {
            // This checks to see if a string starts with a number. That way, the first if statement below executes properly. 
            const number_start = (v) => {
                return v.match(/^[0-9]/)
            }
            // second condition ensures that if street number is already a part of the address, then value from ownerStreetNo won't populate at the beginning and cause dupe ownerStreetNo
            if (record.get('ownerStreetNo') !== null && !number_start(record.get('ownerStreetAddress'))) {
                const ownerStreetAddress = record.get('ownerStreetNo') + ' ' + record.get('ownerStreetAddress')
                record.set('ownerStreetAddress', ownerStreetAddress)
            }

            // This checks to see if specific values are part of the strings. 
            const suffix_in_address = (v) => {
                return v.match(/^.+(Blvd|Ave|Cir|Cres|Crst|Ct|Dr|Ext|Gin|Hl|Hts|Hwy|Ln|Loop|Park|Pkwy|Pl|Pt|Rd|Run|St|Ter|Trl|Way)+.*/)
            }
            // second condition specifies that if ownerStreetAddress already contains a suffix, then don't concatenate ownerStreetSuffix to avoid dupe suffixes.
            if (record.get('ownerStreetSuffix') !== null && !suffix_in_address(record.get('ownerStreetAddress'))) {
                const ownerStreetAddress = record.get('ownerStreetAddress') + ' ' + record.get('ownerStreetSuffix')
                record.set('ownerStreetAddress', ownerStreetAddress)
            }

            // This checks to see if an address already contains unit number. That way, the first if statement below executes correctly.
            const unit_in_address = (v) => {
                return v.match(/^.+(Rm|RM|Ste)+\s+[0-9]{1,4}.*/)
            }
            // if ownerUnit is not null then ownerStreetAddress + ', Unit:' + ownerUnit
            // second condition specifies that if there is already unit information inside ownerStreetAddress, then don't also populate with existing info from ownerUnit
            if (record.get('ownerUnit') !== null && !unit_in_address(record.get('ownerStreetAddress'))) {
                const ownerStreetAddress = record.get('ownerStreetAddress') + ' Unit: ' + record.get('ownerUnit')
                record.set('ownerStreetAddress', ownerStreetAddress)
            }

            // second condition specifies that if streetName already contains a suffix, then don't concatenate streetSuffix to avoid dupe suffixes.
            if (record.get('streetSuffix') !== null && !suffix_in_address(record.get('streetName'))) {
                const streetName = record.get('streetName') + ' ' + record.get('streetSuffix')
                record.set('streetName', streetName)
            }

        //address parsing validation for location and owner addresses
        // validate that the zip is a valid zip
        // fill in missing values where they exist

    }
}
)