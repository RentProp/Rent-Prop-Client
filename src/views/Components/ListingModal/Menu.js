import React, { useReducer } from 'react'
import ReactDOM from 'react-dom'
import Select from 'react-select'


const POPULATE_SUBS = 'populateState'
const CLEAR = 'clear'
const data = {
  countries: [
    {
      value: 'realstate',
      label: 'Real State And Property',
      states: [
        { value: 'apartment', label: 'Apartment' },
        { value: 'bunglow', label: 'Bunglow' },
        { value: 'land', label: 'Land' },
        { value: 'Other', label: 'Other' }
      ]
    },
    {
      value: 'services',
      label: 'Staffing And Services',
      states: [
        { value: 'Electrical', label: 'Electrical' },
        { value: 'Carpanter', label: 'Carpanter' },
        { value: 'Painter', label: 'Painter' },
        { value: 'Plumber', label: 'Plumber' },
        { value: 'Cleaners', label: 'Cleaners' },
        { value: 'Packer', label: 'Packers And Movers' },
        { value: 'Other', label: 'Other' }
      ]
    },
    {
        value: 'vehicles',
        label: 'Vehicles (Road/Water)',
        states: [
          { value: 'car', label: 'Car' },
          { value: 'bike', label: 'Bike' },
          { value: 'motorbike', label: 'Motorbike' },
          { value: 'truck', label: 'Truck' },
          { value: 'boats', label: 'Boats' },
          { value: 'Other', label: 'Other' }
        ]
    },
    {
        value: 'otheritems',
        label: 'Applicance And Other Items',
        states: [
          { value: 'Machinery', label: 'Machinery' },
          { value: 'Toolkits', label: 'Toolkits' },
          { value: 'Electrial', label: 'Electrial Appliances' },
          { value: 'Clothings', label: 'Clothings' },
          { value: 'Ballon', label: 'Air Ballon' },
          { value: 'Other', label: 'Other' }
        ]
    }
  ]
}

const initialState = {
  disableCountry: false,
  disableState: true,
  loadingState: false,
  statesToBeLoaded: []
}

function reducer(state, action) {
  switch (action.type) {
    case POPULATE_SUBS:
      return {
        ...state,
        disableCountry: true,
        disableState: false,
        loadingState: false,
        statesToBeLoaded: data.countries.find(
          country => country.value === action.country
        ).states
      }
    case CLEAR:
    default:
      return initialState
  }
}

export default function Menu() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <div className="App">
      <Select
        isDisabled={state.disableCountry}
        isLoading={state.loadingState}
        isClearable
        isSearchable
        placeholder="Category"
        name="category"
        options={data.countries}
        onChange={e => dispatch({ type: POPULATE_SUBS, country: e.value })}
      />

      <br />

      {!state.disableState && (
        <>
          <Select
            isDisabled={state.disableState}
            isLoading={false}
            isClearable
            isSearchable
            placeholder="Sub-Category"
            name="subcategory"
            options={state.statesToBeLoaded}
          />
        </>
      )}
    </div>
  )
}


