import { Avatar, Button, Grid, IconButton, makeStyles, Paper, Typography } from "@material-ui/core";
import { CommentRounded as CommentIcon, ThumbUpAltOutlined as LikeIcon } from "@material-ui/icons";
import { AvatarGroup } from "@material-ui/lab";
import React from "react";
import { TransactionRequestStatus, TransactionResponseItem, User } from "../models";
import {
  currentUserLikesTransaction,
  isPendingRequestTransaction,
  receiverIsCurrentUser,
} from "../utils/transactionUtils";
import CommentForm from "./CommentForm";
import CommentsList from "./CommentList";
import TransactionAmount from "./TransactionAmount";
import TransactionTitle from "./TransactionTitle";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  paperComments: {
    marginTop: theme.spacing(6),
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  avatar: {
    width: theme.spacing(2),
  },
  headline: {
    marginTop: theme.spacing(4),
  },
  avatarLarge: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  avatarGroup: {
    margin: 10,
  },
  redButton: {
    backgrounColor: "red",
    color: "#ffffff",
    backgroundColor: "red",
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 20,
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "red",
      borderColor: "red",
      boxShadow: "none",
    },
  },
  greenButton: {
    marginRight: theme.spacing(2),
    color: "#ffffff",
    backgroundColor: "#00C853",
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 20,
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#4CAF50",
      borderColor: "#00C853",
      boxShadow: "none",
    },
  },
}));

type TransactionProps = {
  transaction: TransactionResponseItem;
  transactionLike: Function;
  transactionComment: Function;
  transactionUpdate: Function;
  currentUser: User;
};

const TransactionDetail: React.FC<TransactionProps> = ({
  transaction,
  transactionLike,
  transactionComment,
  transactionUpdate,
  currentUser,
}) => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Typography
        component="h2"
        variant="h6"
        color="primary"
        gutterBottom
        data-test="transaction-detail-header"
      >
        Transaction Detail
      </Typography>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        data-test={`transaction-item-${transaction.id}`}
      >
        <Grid item className={classes.headline}>
          <AvatarGroup className={classes.avatarGroup} max={2}>
            <Avatar
              data-test="transaction-sender-avatar"
              className={classes.avatarLarge}
              src={transaction.senderAvatar}
            />
            <Avatar
              data-test="transaction-receiver-avatar"
              className={classes.avatarLarge}
              src={transaction.receiverAvatar}
            />
          </AvatarGroup>
          <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
            <Grid item></Grid>
            <Grid item>
              <TransactionTitle transaction={transaction} />
            </Grid>
            <Grid item>
              <Typography
                variant="body2"
                color="textSecondary"
                gutterBottom
                data-test="transaction-description"
              >
                {transaction.description}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <TransactionAmount transaction={transaction} />
        </Grid>
      </Grid>
      <Grid container direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
        <Grid item>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
          >
            <Grid item data-test={`transaction-like-count-${transaction.id}`}>
              {transaction.likes ? transaction.likes.length : 0}{" "}
            </Grid>
            <Grid item>
              <IconButton
                color="primary"
                disabled={currentUserLikesTransaction(currentUser, transaction)}
                onClick={() => transactionLike(transaction.id)}
                data-test={`transaction-like-button-${transaction.id}`}
              >
                <LikeIcon />
              </IconButton>
            </Grid>
            <Grid item>
              {receiverIsCurrentUser(currentUser, transaction) &&
                isPendingRequestTransaction(transaction) && (
                  <Grid item>
                    <Button
                      className={classes.greenButton}
                      variant="contained"
                      size="small"
                      onClick={() =>
                        transactionUpdate({
                          id: transaction.id,
                          requestStatus: TransactionRequestStatus.accepted,
                        })
                      }
                      data-test={`transaction-accept-request-${transaction.id}`}
                    >
                      Accept Request
                    </Button>
                    <Button
                      variant="contained"
                      className={classes.redButton}
                      size="small"
                      onClick={() =>
                        transactionUpdate({
                          id: transaction.id,
                          requestStatus: TransactionRequestStatus.rejected,
                        })
                      }
                      data-test={`transaction-reject-request-${transaction.id}`}
                    >
                      Reject Request
                    </Button>
                  </Grid>
                )}
            </Grid>
          </Grid>
          <Grid item>
            <CommentForm
              transactionId={transaction.id}
              transactionComment={(payload) => transactionComment(payload)}
            />
          </Grid>
        </Grid>
      </Grid>
      {transaction.comments.length > 0 && (
        <Paper className={classes.paperComments}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            <CommentIcon /> Comments
          </Typography>
          <CommentsList comments={transaction.comments} />
        </Paper>
      )}
    </Paper>
  );
};

export default TransactionDetail;
