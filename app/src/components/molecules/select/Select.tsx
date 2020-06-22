import { Theme, Styles, OptionsType, OptionTypeBase } from "react-select"
import { colors } from '../../../css/var/color';
import { Props } from "react-select/creatable";
import makeAnimated from "react-select/animated";

export const SelectTheme = (baseTheme: Theme): Theme => {
    return {
        ...baseTheme,
        colors: {
          ...baseTheme.colors,
          primary: colors.primary,
          neutral0: 'white',
          primary25: colors.primaryLight,
        },
    } 
}

export const FeedSelectStyle: Partial<Styles> = {
    container: (provided, state) => {
        return {
            ...provided,
            fontFamily: 'Libre Baskerville, serif',
            
        }
    },
    singleValue: (provided, state) => {
        return {
            ...provided,
            fontSize: '1.5em',
        }
    },
    control: (provided, state) => {
        return {
            ...provided,
            border: 'none',
        }
    },
}

export const baseSelectAttrs: Props<OptionTypeBase> = {
    components: {
        DropdownIndicator:() => null, 
        IndicatorSeparator:() => null,
        ...makeAnimated()
    },
    theme: SelectTheme
}