import {
  SpaceConfig,
  Workbook
} from '@flatfile/configure'

import {master_address_sheet} from './Sheets/master_address'

export default new SpaceConfig({
  // This name will display under "Config" when creating a new Space. ID value of deployed "SpaceConfig" seen in the terminal will be the same as shown in the UI.
  name: "Master Address Table Import",
  workbookConfigs: {
      "master_address_workbook": new Workbook({
          // This name will display on the left panel once you create and then open a relevant space in the UI.
          name: "Master Address Table",
          sheets: {
              master_address_sheet
          },
      })
  }
})
