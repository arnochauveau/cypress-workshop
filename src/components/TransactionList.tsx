import { Button, Grid, ListSubheader, makeStyles, Paper } from "@material-ui/core";
import { isEmpty } from "lodash/fp";
import React, { ReactNode } from "react";
import { Link as RouterLink } from "react-router-dom";
import { TransactionPagination, TransactionResponseItem } from "../models";
import EmptyList from "./EmptyList";
import SkeletonList from "./SkeletonList";
import TransferMoneyIllustration from "./SvgUndrawTransferMoneyRywa";
import TransactionInfiniteList from "./TransactionInfiniteList";

export interface TransactionListProps {
  header: string;
  transactions: TransactionResponseItem[];
  isLoading: Boolean;
  showCreateButton?: Boolean;
  loadNextPage: Function;
  pagination: TransactionPagination;
  filterComponent: ReactNode;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    paddingLeft: theme.spacing(1),
  },
}));

const TransactionList: React.FC<TransactionListProps> = ({
  header,
  transactions,
  isLoading,
  showCreateButton,
  loadNextPage,
  pagination,
  filterComponent,
}) => {
  const classes = useStyles();

  const showEmptyList = !isLoading && transactions?.length === 0;
  const showSkeleton = isLoading && isEmpty(pagination);

  return (
    <Paper className={classes.paper}>
      {filterComponent}
      <ListSubheader component="div">{header}</ListSubheader>
      {showSkeleton && <SkeletonList />}
      {transactions.length > 0 && (
        <TransactionInfiniteList
          transactions={transactions}
          loadNextPage={loadNextPage}
          pagination={pagination}
        />
      )}
      {showEmptyList && (
        <EmptyList entity="Transactions">
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            style={{ width: "100%" }}
            spacing={2}
          >
            <Grid item>
              <TransferMoneyIllustration style={{ height: 200, width: 300, marginBottom: 30 }} />
            </Grid>
            <Grid item>
              {showCreateButton && (
                <Button
                  data-test="transaction-list-empty-create-transaction-button"
                  variant="contained"
                  color="primary"
                  component={RouterLink}
                  to="/transaction/new"
                >
                  Create A Transaction
                </Button>
              )}
            </Grid>
          </Grid>
        </EmptyList>
      )}
    </Paper>
  );
};

export default TransactionList;
