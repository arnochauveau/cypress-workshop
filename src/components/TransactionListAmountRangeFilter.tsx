import {
  Button,
  Chip,
  Drawer,
  Grid,
  makeStyles,
  Popover,
  Slider,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { ArrowDropDown as ArrowDropDownIcon } from "@material-ui/icons";
import { first, last } from "lodash/fp";
import React from "react";
import { TransactionAmountRangePayload } from "../models";
import {
  amountRangeValueText,
  amountRangeValueTextLabel,
  formatAmountRangeValues,
  padAmountWithZeros,
} from "../utils/transactionUtils";

const useStyles = makeStyles((theme) => ({
  amountRangeRoot: {
    width: 300,
    margin: 30,
  },
  amountRangeTitleRow: {
    width: "100%",
  },
  amountRangeTitle: {
    width: 225,
  },
  amountRangeSlider: {
    width: 200,
  },
}));

export type TransactionListAmountRangeFilterProps = {
  filterAmountRange: Function;
  amountRangeFilters: TransactionAmountRangePayload;
  resetAmountRange: Function;
};

const TransactionListAmountRangeFilter: React.FC<TransactionListAmountRangeFilterProps> = ({
  filterAmountRange,
  amountRangeFilters,
  resetAmountRange,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const xsBreakpoint = useMediaQuery(theme.breakpoints.only("xs"));

  const initialAmountRange = [0, 100];
  const [amountRangeValue, setAmountRangeValue] = React.useState<number[]>(initialAmountRange);

  const [amountRangeAnchorEl, setAmountRangeAnchorEl] = React.useState<HTMLDivElement | null>(null);

  const handleAmountRangeClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAmountRangeAnchorEl(event.currentTarget);
  };

  const handleAmountRangeClose = () => {
    setAmountRangeAnchorEl(null);
  };

  const handleAmountRangeChange = (_event: any, amountRange: number | number[]) => {
    filterAmountRange({
      amountMin: padAmountWithZeros(first(amountRange as number[]) as number),
      amountMax: padAmountWithZeros(last(amountRange as number[]) as number),
    });
    setAmountRangeValue(amountRange as number[]);
  };

  const amountRangeOpen = Boolean(amountRangeAnchorEl);
  const amountRangeId = amountRangeOpen ? "amount-range-popover" : undefined;

  const AmountRangeFilter = () => (
    <Grid
      data-test="transaction-list-filter-amount-range"
      container
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      spacing={1}
      className={classes.amountRangeRoot}
    >
      <Grid item>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          className={classes.amountRangeTitleRow}
        >
          <Grid item className={classes.amountRangeTitle}>
            <Typography color="textSecondary" data-test="transaction-list-filter-amount-range-text">
              Amount Range: {formatAmountRangeValues(amountRangeValue)}
            </Typography>
          </Grid>
          <Grid item>
            <Button
              data-test="transaction-list-filter-amount-clear-button"
              onClick={() => {
                setAmountRangeValue(initialAmountRange);
                resetAmountRange();
              }}
            >
              Clear
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Slider
          data-test="transaction-list-filter-amount-range-slider"
          className={classes.amountRangeSlider}
          value={amountRangeValue}
          min={0}
          max={100}
          onChange={handleAmountRangeChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          getAriaValueText={amountRangeValueText}
          valueLabelFormat={amountRangeValueTextLabel}
        />
      </Grid>
    </Grid>
  );

  return (
    <div>
      <Chip
        color="primary"
        variant="outlined"
        onClick={handleAmountRangeClick}
        data-test="transaction-list-filter-amount-range-button"
        label={`Amount: ${formatAmountRangeValues(amountRangeValue)}`}
        deleteIcon={<ArrowDropDownIcon />}
        onDelete={handleAmountRangeClick}
      />
      {!xsBreakpoint && (
        <Popover
          id={amountRangeId}
          open={amountRangeOpen}
          anchorEl={amountRangeAnchorEl}
          onClose={handleAmountRangeClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <AmountRangeFilter />
        </Popover>
      )}
      {xsBreakpoint && (
        <Drawer
          id={amountRangeId}
          open={amountRangeOpen}
          ModalProps={{ onClose: handleAmountRangeClose }}
          anchor="bottom"
          data-test="amount-range-filter-drawer"
        >
          <Button
            data-test="amount-range-filter-drawer-close"
            onClick={() => handleAmountRangeClose()}
          >
            Close
          </Button>
          <AmountRangeFilter />
        </Drawer>
      )}
    </div>
  );
};

export default TransactionListAmountRangeFilter;
