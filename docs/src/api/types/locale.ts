// strings are nested by periodId -> fieldId -> cronType -> position
// '*' can be used as a wildcard

// cronType = empty | value | range | everyX | *
// position = prefix | text | suffix | *

type Locale = {
    '{periodId}'?: {
        '{position}'?: string // prefix/text/suffix of period selection 
        '{fieldId}'?: {
            '{cronType}'?: {
                '{positon}'?: string // prefix/text/suffix of field
            }
        }
    }
}