import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import GeneticElement, { Species } from '@eplant/GeneticElement'
import { useSpecies } from '@eplant/state'
import { Button, MenuItem, styled, TextField } from '@mui/material'
import Stack from '@mui/material/Stack'

import SearchBar from './SearchBar'

export const MenuButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.text.secondary,
  textAlign: 'left',
  justifyContent: 'left',
}))

/**
 * Contains all methods of searching for genes. Currently only supports searching by name.
 *
 * @export
 * @param props.addGeneticElements A function that is called when new genes are added
 * @return {*}
 */
export function SearchGroup({
  addGeneticElements,
}: {
  addGeneticElements: (gene: GeneticElement[]) => void
}) {
  const [species, setSpecies] = useState<Species>()
  const [speciesList, setSpeciesList] = useSpecies()
  const [searchingByExpression, setSearchingByExpression] =
    useState<boolean>(false)
  const [searchingByPhenotype, setSearchingByPhenotype] =
    useState<boolean>(false)
  const { viewId, geneId } = useParams()
  const getGeneticElement = (terms: string[]) => {
    if (!species) return
    Promise.all(terms.map(species.api.searchGene)).then((a) =>
      addGeneticElements(a.filter((x) => x != null) as GeneticElement[])
    )
  }
  useEffect(() => {
    if (!species && speciesList.length) setSpecies(speciesList[0])
  }, [species])

  useEffect(() => {
    if (geneId) {
      getGeneticElement([geneId])
    }
  }, [geneId, species])

  return (
    <Stack direction='column' spacing={2}>
      {/* Species selector */}
      {/* commenting out until multi species support*/}
      {/* <TextField
        select
        size='small'
        value={species?.name ?? ''}
        onChange={(e) =>
          setSpecies(speciesList.find((s) => s.name == e.target.value))
        }
        // label="Species"
        variant='standard'
        inputProps={{
          sx: {
            ':focus': {
              backgroundColor: 'transparent',
            },
          },
        }}
      >
        {speciesList.map((s, idx) => (
          <MenuItem key={s.name} value={s.name}>
            {s.name}
          </MenuItem>
        ))}
      </TextField> */}

      {/* Gene selector */}
      <SearchBar
        label='Search for genes'
        inputProps={{
          // TODO: Make these clickable
          helperText: <span>Example ABI3 or AT5G60200</span>,
        }}
        complete={species?.api?.autocomplete}
        onSubmit={(terms: string[]) => {
          if (!species) return
          Promise.all(terms.map(species.api.searchGene)).then((a) =>
            addGeneticElements(a.filter((x) => x != null) as GeneticElement[])
          )
        }}
      ></SearchBar>
      {/* TODO: Implement alternate search options 
      <MenuButton disabled variant="contained">
        Search by expression
      </MenuButton>
      <MenuButton disabled variant="contained">
        Search by phenotype
      </MenuButton>
      */}
    </Stack>
  )
}
