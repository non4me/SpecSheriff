# A commit whose review cannot be carried out is refused

The SpecSheriff tools refuse a commit for which the reviewer must make at least one judgement (§s-m4h279nbaqkpa3t) unless the reviewer gives an answer that the tools can read. The refusal says why the review could not be carried out.

Example: No reviewer is installed.
Example: The reviewer's run does not end within its time limit.
Example: The run ends with an error.
Example: The answer passes the commit but reports a finding.

Reason: A review that lets a commit through whenever it could not be carried out is a review nobody can rely on.
