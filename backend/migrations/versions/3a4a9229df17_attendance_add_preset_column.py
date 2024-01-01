"""attendance add preset column

Revision ID: 3a4a9229df17
Revises: 1d63e0b9ea1c
Create Date: 2024-01-01 20:33:50.860890

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "3a4a9229df17"
down_revision: Union[str, None] = "1d63e0b9ea1c"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Step 1: Add the column allowing NULL
    op.add_column("attendance", sa.Column("preset", sa.Integer(), nullable=True))

    # Step 2: Update the column value for all existing rows
    op.execute("UPDATE attendance SET preset = 1 WHERE preset IS NULL")

    # Step 3: Alter column to NOT NULL
    op.alter_column("attendance", "preset", nullable=False)


def downgrade() -> None:
    op.drop_column("attendance", "preset")
