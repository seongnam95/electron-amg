"""position name

Revision ID: ae3de3df55e6
Revises: a46837df4852
Create Date: 2023-11-27 22:37:00.167849

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "ae3de3df55e6"
down_revision: Union[str, None] = "a46837df4852"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade():
    # batch mode를 사용하여 컬럼 수정
    with op.batch_alter_table("position", schema=None) as batch_op:
        batch_op.drop_constraint("name", type_="unique")
        batch_op.create_unique_constraint(None, ["name"])


def downgrade():
    # downgrade를 위한 batch mode
    with op.batch_alter_table("position", schema=None) as batch_op:
        batch_op.drop_constraint(None, type_="unique")
        batch_op.create_unique_constraint("name", ["name"])
