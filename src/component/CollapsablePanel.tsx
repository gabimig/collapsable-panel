import {
    Box, Collapse, createStyles, Divider, Grid, makeStyles, SvgIconProps, Typography,
} from '@material-ui/core'
import React, { ReactElement, useState } from 'react'
import { ArrowDropUp, ArrowDropDown } from '@material-ui/icons'
import clsx from 'clsx'

interface classes {
    root?: string
    title?: string
    contentContainer?: string
}

interface SectionHeaderProps {
    title: string | ReactElement
    iconComponent: React.JSXElementConstructor<SvgIconProps>
    children: ReactElement
    hideable?: boolean
    hiddenInit?: boolean
    classes?: classes
}

const useStyles = makeStyles(() => createStyles({
    mainBox: { padding: '1.5em 1.5em 1em 1.5em' },
    title: {
        textTransform: 'capitalize',
        fontWeight: 500,
    },
    header: {
        color: '#555',
        fontStyle: 'normal',
    },
    hiddenHeader: {
        color: '#999',
        fontStyle: 'italic',
    },

    hiddlableHeader: {
        cursor: 'pointer',
        '&:hover, &:focus': {
            backgroundColor: '#F4F4F4',
        },
    },
    icon: {
        display: 'flex',
        margin: '0em 0.5em 0.2em',
    },
    iconArrow: {
        display: 'flex',
        margin: '0.5em 0.5em 0.2em ',
    },
    content: { paddingTop: '1.3em' },
}))

const CollapsablePanel = ({
    title,
    iconComponent: IconComponent,
    children,
    hideable = false,
    hiddenInit = false,
    classes: classesAttr,
}: SectionHeaderProps): React.ReactElement => {
    const [isHided, setIsHide] = useState<boolean>(hiddenInit)
    const classes = useStyles({ hideable, isHided })
    const handleHide = () => {
        setIsHide(!isHided)
    }

    return (
        <Box className={classes.mainBox}>
            <div
              className={clsx(classes.header, {
                    [classes.hiddlableHeader]: hideable,
                    [classes.hiddenHeader]: hideable && isHided,
                },
                classesAttr?.root
              )}
              style={{ display: 'flex' }}
              role="button"
              aria-hidden
              onClick={handleHide}
              onKeyPress={handleHide}
              data-testid="main-container"
            >
                <Grid container justify="flex-start">
                    <Typography
                      variant="h6"
                      gutterBottom
                      noWrap
                      className={clsx(classes.title, classesAttr?.root)}
                    >
                        <Box display="flex" alignItems="flex-end">
                            <Box className={classes.icon}>
                                <IconComponent />
                            </Box>
                            {title}
                        </Box>
                    </Typography>
                </Grid>
                {hideable && (
                    <Grid container justify="flex-end">
                        <Box className={classes.iconArrow}>
                            {isHided ? <ArrowDropDown /> : <ArrowDropUp />}
                        </Box>
                    </Grid>
                )}
            </div>
            <Divider />
            <Collapse 
                className={clsx(classes.content, classesAttr?.contentContainer)} 
                in={!hideable || !isHided}
            >
                {children}
            </Collapse>
        </Box>
    )
}

CollapsablePanel.defaultProps = {
    hideable: false,
    hiddenInit: false,
    classes: {
        root: '',
        title: '',
        contentContainer: '',
    }
}

export default CollapsablePanel
